import fs from 'fs-extra'
import inquirer from 'inquirer'
import chalk from 'chalk'
import runUninstallation from '../../uninstall'

export default async function avatarBackup(options) {

  const pathToImages = options.paths.images
  const pathToBackup = options.paths.backup

  if(fs.readdirSync(pathToBackup).filter(f => !f.startsWith('.')).length) {
    const goOn = await inquirer.prompt({
      type: 'confirm',
      name: "confirmation",
      message: chalk.yellowBright("You already have mods installed, this will uninstall them and install the new ones. Continue?"),
      default: true
    })
/** Stop the process if the user doesn't want to uninstall the mods */
    if(!goOn.confirmation) {
      console.log(chalk.red("The installation has been cancelled."))
      process.exit(1)
    }
/** Uninstall the mods otherwise */
    else {
      await runUninstallation(options)
    }
  }

  let answer = await inquirer.prompt({
    type: 'input',
    name: 'avatarName',
    message: `What the name of the file of your current avatar (including the extension)? You can find it here : ${chalk.cyan(pathToImages)}\n${chalk.bgYellow(chalk.black("Info :"))} It should resemble a code like '3483474101.png'`,
    validate(answer) {
      if(!fs.existsSync(`${pathToImages}/${answer}`)) {
        return "This file couldn't be found, make sure you wrote it correctly."
      }
      return true
    }
  })

  let avatarName = answer.avatarName
/** Preparing backup for the avatar */
  fs.copySync(`${pathToImages}/${avatarName}`, `${pathToImages}/Backup/Avatar/${avatarName}`)


  if(!fs.existsSync(`${pathToImages}/Mods/Avatar`)) fs.mkdirsSync(`${pathToImages}/Mods/Avatar`)
}