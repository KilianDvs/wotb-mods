WoT Full National Crew Voice Mod - for World of Tanks Blitz 

Compatible game version: 8.9.X
Version: 2.3_8.9.X
build time: 24/03/2022 12:51AM UTC+11, Sydney Time

How to use:
	~!~ REMEMBER TO ENABLE NATIONAL CREW VOICE OPTION IN-GAME ~!~
	Android:
		Load the Data/Sfx folder into APK file, reinstall the game with modified apk.
		Data/crew_voices.yaml or packs/crew_voices_female.yaml (need to rename to crew_voices.yaml) can be placed inside Android/data/net.wargaming.wot.blitz/files/packs/, as Android/data/net.wargaming.wot.blitz/files/packs/crew_voice.yaml, for easy customization.
		Customize packs/crew_voice.yaml as you wish.
	All others:
		Load everything into the game folder
		Delete the original Data/crew_voices.yaml.dvpl, so the game can read Data/crew_voices.yaml Data/crew_voices_female.yaml (need to rename to crew_voices.yaml)
		Customize Data/crew_voice.yaml as you wish.

crew_voice.yaml customization guide:
	the following are the voice codes:
		"ru" - Russian Male
		"ru2" - Russian Female
		"de" - German Male
		"de2" - German Female
		"en" - American Male
		"en2" - American Female
     		"cn" - Chinese Male
     		"cn2" - Chinese Female
     		"fr" - French Male
     		"fr2" - French Female
     		"en_gb" - British Male
     		"en_gb2" - British Female
     		"ja" - Japanese Male (new)
     		"ja2" - Japanese Female
     		"ja-old" - Japanese Male (old)
     		"cs" - Czech Male
     		"cs2" - Czech Female
     		"it" - Italian Male
     		"it2" - Italian Female
     		"pl" - Polish Male
     		"pl2" - Polish Female
     		"sv" - Swedish Male
     		"sv2" - Swedish Female
		"sab" - Sabaton Crew Voice

	each nation (tech tree) has it's own code (beware it must be all lower case!).
		- ussr
		- germany
		- usa
		- china
		- france
		- uk
		- japan
		- other (this is Blitz Nation, mostly Fantasy tanks)
		- european (this is European tanks)

	Same goes for Subnations (including Australia!)
		- poland
		- sweden
 		- finland
		- italy
		- czech

		- canada (for Ram II)
		- australia (Centurion Mk5/1 & AC 1 Sentinal & AC 4 Sentinal

	under nations, you can assign one voice code onto a nation code, for example:
		ussr: "ru2" (this assigns the Russian female crew voice onto the nation ussr.)
	
	each tank also has it's own code, which is basically the name of it's XML file. 
	look into \XML\item_defs\vehicles for the tank codes in the name, 
		for example \XML\item_defs\vehicles\ussr\A-20.xml.dvpl will have the tank code of "A-20".
	so under tanks, you can assign one voice code onto each tank code + nation code, for example:
		"ussr:A-20": "sv" (this assigns the Male Swedish crew voice onto A-20 from USSR.)
		or
		"european:It08_Progetto_M40_mod65": "it2" (this assigns the Female Italian crew voice onto the Progetto 65 for European nation.)

	have fun!
	
Changelog:
2.3:
	- Migrated to 8.5's new National crew voice system (obviously forcefully added Swedish into it :p )

2.2:
	- Added Polish tech tree, and new testing tanks like Lansen C and T-25 BP (czech)
	- Some housekeeping with the arrangements of the tanks within crew_voices.yaml to make it more maintainable in the future.
2.1:
	- Updated "uk" and "uk2" language into "en_gb" and "en_gb2" respectively, to keep it in line with game settings
2.0:
	- Changed engine to Wwise
	- Added all Czech tanks to crew_voice.yaml
1.0:
	- reduced volume a bit
	- added all Sweden tanks from 7.3
1.0-prerelease:
	- Changed how female crew voice is included. Now it comes with audio effects.

1.0-beta2:
	- Fixed incorrect documentation about Japanese Female Crew Voice
	- Adjusted volume overall, added normalization for voices to make voices sound louder.

1.0-beta1:
	- Added Male Italian crew voice (it)
	- Added Male Polish crew voice (pl)
	- Added Male Swedish crew voice (sv)
	- Added new Male Japanese crew voice (ja)
	- Added Female Russian crew voice (ru2)
	- Added Female German crew voice (de2)
	- Added Female American crew voice (en2)
	- Added Female French crew voice (fr2)
	- Added Female British crew voice (uk2)
	- Added Female Japanese crew voice (ja2)
	- Added Female Czech crew voice (cs2)
	- Added Female Italian crew voice (it2)
	- Added Female Polish crew voice (pl2)
	- Added Female Swedish crew voice (sv2)
	- Renamed Old Male Japanese crew voice to (ja-old)
	- Changed fsb compression format to Vorbis, may impact loading speed at battle loading (experimental)
	- Changed All event start timings
	- Removed delay for battle start event
	- Added event effects, which may impact performance (experiemental)
	- Changed all fsb file to lower-cases.
	- Added instructions and information to crew_voice.yaml for customization.