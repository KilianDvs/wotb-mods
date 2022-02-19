import fs from 'fs-extra'

export default async function installGunsMod(options) {

  console.log(options)

  const pathToData = options.paths.data
  const pathToMods = options.paths.mods
  const pathToMod = `${pathToMods}/PC gun sounds/Data`

  /** Taking care of WwiseSound */
  fs.readdirSync(`${pathToMod}/WwiseSound`).forEach(fileName => {
    if(fileName.startsWith(".")) return
    const pathToFile = `${pathToMod}/WwiseSound/${fileName}`
    fs.copySync(pathToFile, `${pathToData}/WwiseSound/${fileName}`)
  })

  /** Taking care of XML/item_defs/vehicles */
  const pathToVehicles= `${pathToMod}/XML/item_defs/vehicles`
  fs.readdirSync(pathToVehicles).forEach(nation => {
    if(nation.startsWith(".")) return    
    
    const pathToFolder = `${pathToVehicles}/${nation}`
    
    fs.readdirSync(pathToFolder).forEach(item => {
      if(item.startsWith(".")) return
      
      const pathToItem = `${pathToFolder}/${item}`
      
      if(fs.lstatSync(pathToItem).isDirectory()) {
        fs.readdirSync(pathToItem).forEach(component => {
          const pathToComponent = `${pathToItem}/${component}`
          
          fs.copySync(pathToComponent, `${pathToData}/XML/item_defs/vehicles/${nation}/${item}/${component}`)
        })
      }
      else {
        fs.copySync(pathToItem, `${pathToData}/XML/item_defs/vehicles/${nation}/${item}`)
      }
    })
  })
}