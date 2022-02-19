import avatarBackup from "./backup/avatar"
import profileBgBackup from "./backup/profileBg"
import otherModsBackup from "./backup/otherMods"
import installCrewMod from "./assets/crew"
import installGunsMod from "./assets/guns"
import installTechTreeMod from "./assets/techtree"
import installImagesMod from "./assets/images"

export default async function runInstallation(options) {

/** Preparing the backups */

/** Images */
  if(options.mods.includes('avatar')) {
    await avatarBackup(options)
  }
  if(options.mods.includes('profilebg')) {
    await profileBgBackup(options)
  }

/** Other mods */
  if(options.mods.filter(mod => mod !== 'avatar' && mod !== "profilebg").length) {
    await otherModsBackup(options)
  }

/** Installing the mods */

/** PC crew voices */
    if(options.mods.includes('crewm') || options.mods.includes('crewf') || options.mods.includes('crewc')) {
      const modType = options.mods.filter(mod => mod.startsWith('crew'))[0]
      await installCrewMod(options, modType)
    }
/** PC gun sounds */
    if(options.mods.includes('guns')) await installGunsMod(options)

/** Extended tech tree */
    if(options.mods.includes('techtree')) await installTechTreeMod(options)

/** Images */
    if(options.mods.includes('avatar') || options.mods.includes('profilebg')) await installImagesMod(options)
}