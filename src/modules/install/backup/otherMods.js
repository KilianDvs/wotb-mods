import chalk from 'chalk'
import fs from 'fs-extra'
import runUninstallation from '../../uninstall'
import inquirer from 'inquirer'

export default async function otherModsBackup(options) {

  const pathToData = options.paths.dataTest
  const pathToBackup = options.paths.backup

/** If a backup already exists, ask the user if they want to stop install or replace the existing mods */
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

/** Preparing backup for crew_voices.yaml.dvpl */
  fs.copySync(`${pathToData}/crew_voices.yaml.dvpl`, `${pathToBackup}/crew_voices.yaml.dvpl`)
    
/** Preparing backup for WwiseSound */
  fs.copySync(`${pathToData}/WwiseSound`, `${pathToBackup}/WwiseSound`)
    
/** Preparing backup for XML/item_defs/vehicles*/
  fs.copySync(`${pathToData}/XML/item_defs/vehicles`, `${pathToBackup}/vehicles`)
    
/** Preparing backup for TechTree*/
  fs.copySync(`${pathToData}/Configs/TechTree`, `${pathToBackup}/TechTree`)
}