import fs from 'fs-extra'

export default async function installTechTreeMod(options) {

  const pathToData = options.paths.dataTest
  const pathToMods = options.paths.mods
  
/** Taking care of Configs */
  const pathToTechTree = `${pathToMods}/Extended tech tree/Data/Configs/TechTree`

  fs.readdirSync(pathToTechTree).forEach(file => {
    if(file.startsWith(".")) return

    fs.copySync(`${pathToTechTree}/${file}`, `${pathToData}/Configs/TechTree/${file}`)
  })

/** Taking care of XML/item_defs/vehicles */
  const pathToVehicles = `${pathToMods}/Extended tech tree/Data/XML/item_defs/vehicles`
  fs.readdirSync(pathToVehicles).forEach(nation => {
    if(nation.startsWith(".")) return

    fs.copySync(`${pathToVehicles}/${nation}/list.xml.dvpl`, `${pathToData}/XML/item_defs/vehicles/${nation}/list.xml.dvpl`)
  })
}