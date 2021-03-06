import fs from 'fs-extra'
import inquirer from 'inquirer'
import chalk from 'chalk'
import runUninstallation from '../../uninstall'

export default async function profileBgBackup(options) {

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

  if(!fs.existsSync(`${pathToImages}/Backup/Background`) || !fs.readdirSync(`${pathToImages}/Backup/Background`).filter(f => !f.startsWith(".")).length) {

    let answer = await inquirer.prompt({
      type: 'input',
      name: 'profileBgName',
      message: `What the name of the file of your current profile background (including the extension)? You can find it here : ${chalk.cyan(pathToImages)}\n${chalk.bgYellow(chalk.black("Info :"))} It should resemble a code like '292020447.webp'`,
      validate(answer) {
        if(!fs.existsSync(`${pathToImages}/${answer}`)) {
          return "This file couldn't be found, make sure you wrote it correctly."
        }
        return true
      }
    })

    let profileBgName = answer.profileBgName
  /** Preparing backup for the profile background */
    fs.copySync(`${pathToImages}/${profileBgName}`, `${pathToImages}/Backup/Background/${profileBgName}`)

    if(!fs.existsSync(`${pathToImages}/Mods/Background`)) fs.mkdirsSync(`${pathToImages}/Mods/Background`)
  }
}