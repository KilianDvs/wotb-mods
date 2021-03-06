import fs from 'fs-extra'
import inquirer from 'inquirer'

export default async function installCrewMod(options, crewType) {

  const pathToData = options.paths.data
  const pathToMods = options.paths.mods
  const pathToMod = `${pathToMods}/PC crew voices/Data`
  
/** Importing the crew_voices.yaml file into the game folder and deleting the original */

  fs.copySync(`${pathToMod}/crew_voices.yaml`, `${pathToData}/crew_voices.yaml`)
  fs.removeSync(`${pathToData}/crew_voices.yaml.dvpl`)

/** Taking care of WwiseSound */
/** Case for customized crew voices */
  if(crewType === "crewc") {
    let allCrewVoices = ["ru","de","en","cn","fr","en_gb","ja","cs","it","pl","sv","sab"]
    let crewVoicesOptions = await inquirer.prompt({
      type: 'checkbox',
      name: 'choices',
      message: "Choose the nations for which you'd want the female crew voices. The others will remain male.",
      choices: [
        {name: "USSR", value: "ru"},
        {name: "Germany", value: "de"},
        {name: "USA", value: "en"},
        {name: "China", value: "cn"},
        {name: "France", value: "fr"},
        {name: "UK", value: "en_gb"},
        {name: "Japan", value: "jp"},
        {name: "Czechoslovakia", value: "cs"},
        {name: "Italy", value: "it"},
        {name: "Poland", value: "pl"},
        {name: "Sweden", value: "sv"}
      ],
      default: [],
      loop: false,
    })
    allCrewVoices = allCrewVoices.map(val => crewVoicesOptions.choices.includes(val) ? val + "2" : val)
    allCrewVoices.forEach(item => {
      const pathToItem = `${pathToMod}/WwiseSound/${item}`
      fs.copySync(pathToItem, `${pathToData}/WwiseSound/${item.replace("2", "")}`)
    })
    
  }
  else {
    for(let i = 0; i < fs.readdirSync(`${pathToMod}/WwiseSound`).length; i++) {
      const item = fs.readdirSync(`${pathToMod}/WwiseSound`)[i]
      const pathToItem = `${pathToMod}/WwiseSound/${item}`

      if(item === ".DS_Store") continue

      if(crewType === "crewf") {
        if(item.endsWith("2")) {
          fs.copySync(pathToItem, `${pathToData}/WwiseSound/${item.replace("2", "")}`)
        }
      }
      else {
        if(!item.endsWith("2")) {
          fs.copySync(pathToItem, `${pathToData}/WwiseSound/${item}`)
        }
      }
    }
  }
}