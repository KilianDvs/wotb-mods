import arg from "arg"
import inquirer from "inquirer"
import chalk from "chalk"
import fs from "fs-extra"
import os from "os"
import path from "path"
import runInstallation from "./modules/install"
import runUninstallation from "./modules/uninstall"
import package_json from "../package.json"

function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--install': Boolean,
      '--uninstall': Boolean,
      '--help': Boolean,
      '--version': Boolean,
      '-i': '--install',
      '-u': '--uninstall',
      '-h': '--help',
      '-v': '--version',
    },
    {
      argv: rawArgs.slice(2),
      permissive: true
    }
  )
  return {
    runInstall: args["--install"] || false,
    runUninstall: args["--uninstall"] || false,
    help: args["--help"] || false,
    version: args["--version"] || false,
    mods: args._.filter(i => !i.includes("-")).length ? args._.filter(i => !i.includes("-")) : ["crewm", "guns", "techtree"],
    unknownFlags: args._.filter(i => i.includes("-")).length ? args._.filter(i => i.includes("-")) : [],
  }
}

async function handleHelpAndVersion(options) {
  if(options.help) {
    console.log(`
${chalk.bold.blue('wotb -i')} : installs the PC gun sounds, PC crew voices male and Extended tech tree mods
${chalk.bold.blue('wotb -i args')} : installs the mods provided as arguments
Here's a list of the accepted arguments :
  > ${chalk.green('crewm')} : PC crew voices male
  > ${chalk.green('crewf')} : PC crew voices female
  > ${chalk.green('crewc')} : PC crew voices custom
  > ${chalk.green('guns')} : PC gun sounds
  > ${chalk.green('techtree')} : Extended tech tree
  > ${chalk.green('avatar')} : Avatar image change
  > ${chalk.green('profilebg')} : Profile background image change
${chalk.bold.blue('wotb -u')} : uninstalls all the mods previously installed by this script
${chalk.bold.blue('wotb -v')} : shows the version of the script, which should match the version of the game
`)
    process.exit(0)
  }

  if(options.version) {
    console.log(`v${package_json.version}`)
    process.exit(0)
  }
}

async function handleUnknownFlags(options) {
  if(options.unknownFlags.length) {
    console.log(chalk.red(`Error : Unknown ${options.unknownFlags.length === 1 ? "option" : "options"} "${options.unknownFlags.join(', ')}"`))
    console.log(chalk.yellowBright(`"wotb --help" to see the options available`))
    process.exit(1)
  }
}

async function promptForMissingOptions(options) {

  const questions = []

  if(options.runInstall && options.runUninstall) {
    options.runInstall = false
    options.runUninstall = false
    questions.push({
      type: 'list',
      name: 'action',
      message: "You can't both install and uninstall mods at the same time! Do you want to install or uninstall mods?",
      choices: [ 'Install', "Uninstall" ],
      default: 'Install'
    })
  }

  if(!options.runInstall && !options.runUninstall) {
    questions.push({
      type: 'list',
      name: 'action',
      message: "Do you want to install or uninstall mods?",
      choices: [ 'Install', "Uninstall" ],
      default: 'Install'
    })
  }

  const answers = await inquirer.prompt(questions)

  if(options.runUninstall || answers.action === "Uninstall") {
    options.mods = []
  }
  else {
    options = await checkForModsValidity(options)
  }

  const paths = await createPaths()

  return {
    ...options,
    runInstall: options.runInstall || answers.action === 'Install' ? true : false,
    runUninstall: options.runUninstall || answers.action === 'Uninstall' ? true : false,
    mods: options.runUninstall || answers.action === "Uninstall" ? [] : options.mods,
    paths: paths
  }
}

async function createPaths() {

  const steamPathToData = "/Steam/steamapps/common/World of Tanks Blitz/Data"
  const AppStorePathToData = "/Applications/World of Tanks Blitz.app/Contents/Resources/Data"

  const data = 
    fs.existsSync(steamPathToData) ? steamPathToData
  : fs.existsSync(AppStorePathToData) ? AppStorePathToData
  : undefined

  const home = process.env.HOME
  const windowsPathToImages = `${home}/Documents/DAVAProjects/image_cache`
  const macPathToImages = `${home}/Library/Containers/net.wargaming.wotblitz.macos/Data/Documents/DAVAProject/image_cache`

  const images =
    os.type() === "Darwin" ? macPathToImages : windowsPathToImages

  const backup = path.resolve(__dirname, "../Backup")
  const mods = path.resolve(__dirname, "../Mods")

    return {
      data,
      images,
      backup,
      mods
    }
}

async function checkForModsValidity(options) {
  
  if(!options.mods.length) return options

  const validMods = ["crewm", "crewf", "crewc", "guns", "techtree", "avatar", "profilebg"]

  if(options.mods.every(mod => validMods.includes(mod))) return options
  console.log(chalk.red("One or more of the mods you provided are invalid"))
  const answer = await inquirer.prompt({
    type: 'checkbox',
    name: 'mods',
    message: `You can choose the mods you want to install in this list`,
    choices: [
      {name: 'PC crew voices male', value: 'crewm'},
      {name: 'PC crew voices female', value: 'crewf'},
      {name: 'PC crew voices custom', value: 'crewc'},
      {name: 'PC gun sounds', value: 'guns'},
      {name: 'Extended tech tree', value: 'techtree'},
      {name: 'Avatar change', value: 'avatar'},
      {name: 'Profile background change', value: 'profilebg'}
    ],
    validate(ans) {
      if(!ans.length) {
        return 'You have to choose at least one mod to install!'
      }
      if(ans.filter(mod => mod.startsWith("crew")).length > 1) {
        return "You can't have multiple crew voices mods at the same time!"
      }
      return true
    }
  })
  
  return {
    ...options,
    mods: answer.mods
  }
}

export async function cli(args) {
  
  
  let options = parseArgsIntoOptions(args)
  await handleUnknownFlags(options)
  await handleHelpAndVersion(options)
  options = await promptForMissingOptions(options)

  try {
    if(options.runInstall) {
      runInstallation(options)
    }
    if(options.runUninstall) runUninstallation(options)
  }
  catch(err) {
    console.log(err.message)
  }
}