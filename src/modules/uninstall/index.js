import chalk from 'chalk'
import fs from 'fs-extra'

export default async function runUninstallation(options) {

  const pathToData = options.paths.data
  const pathToBackup = options.paths.backup
  const pathToImages = options.paths.images


  if(!fs.readdirSync(pathToBackup).filter(f => !f.startsWith(".")).length && !fs.existsSync(`${pathToImages}/Backup`)) {
    console.error(chalk.red("Error while uninstalling the mods : there are no mods to uninstall."))
    process.exit(1)
  }

/** Putting the backup images back to the image folder and deleting the backup directory */
  if(fs.existsSync(`${pathToImages}/Backup`)) {

    fs.readdirSync(`${pathToImages}/Backup`).filter(f => !f.startsWith(".")).forEach(folderName => {
      const folderPath = `${pathToImages}/Backup/${folderName}`
      const fileName = fs.readdirSync(folderPath).filter(f => !f.startsWith("."))[0]
      fs.copySync(`${folderPath}/${fileName}`, `${pathToImages}/${fileName}`)
    })

    fs.removeSync(`${pathToImages}/Backup`)

  }

/** Putting the backup game files back to the game folder and deleting the backups */

  if(fs.readdirSync(pathToBackup).filter(f => !f.startsWith(".")).length) {

    try {
      fs.copySync(`${pathToBackup}/crew_voices.yaml.dvpl`, `${pathToData}/crew_voices.yaml.dvpl`)
      if(fs.existsSync(`${pathToData}/crew_voices.yaml`)) fs.removeSync(`${pathToData}/crew_voices.yaml`)

      fs.readdirSync(`${pathToData}/WwiseSound`).forEach(i => fs.removeSync(`${pathToData}/WwiseSound/${i}`))
      fs.copySync(`${pathToBackup}/WwiseSound`, `${pathToData}/WwiseSound`)

      fs.readdirSync(`${pathToData}/XML/item_defs/vehicles`).forEach(i => fs.removeSync(`${pathToData}/XML/item_defs/vehicles/${i}`))
      fs.copySync(`${pathToBackup}/vehicles`, `${pathToData}/XML/item_defs/vehicles`)

      fs.readdirSync(`${pathToData}/Configs/TechTree`).forEach(i => fs.removeSync(`${pathToData}/Configs/TechTree/${i}`))
      fs.copySync(`${pathToBackup}/TechTree`, `${pathToData}/Configs/TechTree`)
      
      fs.removeSync(`${pathToBackup}/crew_voices.yaml.dvpl`)
      fs.removeSync(`${pathToBackup}/WwiseSound`)
      fs.removeSync(`${pathToBackup}/vehicles`)
      fs.removeSync(`${pathToBackup}/TechTree`)
    }
    catch(err) {
      if(err.message.startsWith("EACCES: permission denied")) {
        console.error(chalk.red("Error : Some of the files in the game folder are read-only. Impossible to finish the backup process.\n" + chalk.yellowBright(`You can fix this by running the command ${chalk.bgHex('#000033').yellowBright.italic('sudo chmod -R 777 "' + pathToData + '"')} in your terminal. After you enter your password, you'll be able to execute this script again.`)))
      }
      else {
        console.log(err)
      }
    }
    finally {
      console.log(chalk.green("Mods successfully uninstalled!"))
    }

  }

}