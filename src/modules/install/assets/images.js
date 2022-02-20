import chalk from 'chalk'
import fs from 'fs-extra'
import inquirer from 'inquirer'

export default async function installImagesMod(options) {

  const pathToImages = options.paths.images
  const pathToCustom = `${pathToImages}/Mods`
  const pathToBackup = `${pathToImages}/Backup`
  const questions = []

  /** Avatar */

  if(options.mods.includes('avatar')) {
    let backupAvatarName, customAvatarPath

    if(fs.existsSync(`${pathToBackup}/Avatar`))
      backupAvatarName = fs.readdirSync(`${pathToBackup}/Avatar`).filter(f => !f.startsWith('.'))[0]

    if(fs.existsSync(`${pathToCustom}/Avatar`))
      customAvatarPath = pathToCustom + "/Avatar/" + fs.readdirSync(`${pathToCustom}/Avatar`).filter(f => !f.startsWith('.'))[0]

    if(fs.existsSync(customAvatarPath)) {
      fs.copySync(customAvatarPath, `${pathToImages}/${backupAvatarName}`)
    }
    else {
      questions.push({
        type: 'confirm',
        name: 'avatar',
        message: `No image has been found in ${pathToCustom}/Avatar. Have you put your image in it? (you can do it now)`,
        default: false
      })
    }
  }

  /** Profile background */

  if(options.mods.includes('profilebg')) {
    let backupBackgroundName, customBackgroundPath

    if(fs.existsSync(`${pathToBackup}/Background`))
      backupBackgroundName = fs.readdirSync(`${pathToBackup}/Background`).filter(f => !f.startsWith('.'))[0]
    
    if(fs.existsSync(`${pathToCustom}/Background`))
      customBackgroundPath = pathToCustom + "/Background/" + fs.readdirSync(`${pathToCustom}/Background`).filter(f => !f.startsWith('.'))[0]
      
    if(fs.existsSync(customBackgroundPath)) {
      fs.copySync(customBackgroundPath, `${pathToImages}/${backupBackgroundName}`)
    }
    else {
      questions.push({
        type: 'confirm',
        name: 'background',
        message: `No image has been found in ${pathToCustom}/Background. Have you put your image in it? (you can do it now)`,
        default: false
      })
    }
  }

  if(questions.length) {
    const answers = await inquirer.prompt(questions)
    if(answers.avatar || answers.background) {
      await installImagesMod(options)
    }
    else {
      console.log(chalk.red("The installation has be aborted."))
    }
  }
}