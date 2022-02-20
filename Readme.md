# World of Tanks Blitz mods installer

## Motivation

I created this script firstly because I wanted to automate my mods installations, knowing that every single update, I had to install them again... And well, why not give others the ability to automatically install them too?

## Prerequisites

### 1) Playing on a computer or laptop, Windows or Mac

This script is, for now, only available on Windows and Mac. No matter if you installed the game with the App Store or Steam. It might be extanded to Linux in the future if needed.

### 2) Having NodeJS installed

This script uses NodeJS to handle the installation.
You can install NodeJS on their [official website](https://nodejs.org/en/download/).

### 3) Changing the permissions of the game folders and files

If you want this script to work without any problem, **I strongly advise you to change the permissions of your game folders and files**. At least for the Data folder and its subfolders.
You can do that by pasting the following in your terminal :
> For Steam
>
> ``sudo chmod -R -777 "/Steam/steamapps/common/World of Tanks Blitz/Data"``

> For App Store
> 
> ``sudo chmod -R 777 "/Applications/World of Tanks Blitz.app/Contents/Resources/Data"``

- ``sudo`` is to run the command as an administrator. It will most likely ask you for your password in return
- ``chmod`` is to change the permissions of a file or a folder
- ``-R`` is to run the command recursively, i.e to run it for the Data folder and all its subfolders
- ``777`` is one way to set out the permissions. 7 is basically full permissions (read, write and execute)
- ``"path/to/Data"`` is the path to teh game data folder. the quotes are important because there are non-escaped spaces in the path, so don't forget them

## Installation

Nothing simpler! either run ``npm install -g wotb-mods`` or clone this repository.

## How to use it

After you've install it globally, you'll be able to use the ``wotb`` command in your terminal.
This command has several flags :
- ``--install`` or ``-i`` is used to install mods, you can specify some arguments to choose the mods:
>  - ``crewm`` - **PC crew voices male**
>  - ``crewf`` - **PC crew voices female**
>  - ``crewc`` - **PC crew voices custom**
>  - ``guns`` - **PC gun sounds**
>  - ``techtree`` - **Extended tech tree**
>  - ``avatar`` - **Avatar image change**
>  - ``profilebg`` - **Profile background image change**

If you don't specify any argument, the script will install the **PC crew voices male**, **PC gun sounds** and **Extended tech tree** mods by default.

The **PC crew voices custom** will allow you to choose the nations you want the female voices for.

### The particularity of the ``avatar`` and ``profilebg`` mods

These two features of the game are stored in the image cache folder of the game. Thus, it's not renewed with every updates. This script will ask you to search for the file name of your current avatar or profile background. You can find them there :
> For Windows
>
> ```C:/Users/{yourUsername}/Documents/DAVAProjects/image_cache```

> For Mac
> 
> ``/Users/{yourUsername}/Library/Containers/net.wargaming.wotblitz.macos/Data/Documents/DAVAProject/image_cache``

You will also have to put the images you want to use as an avatar in ``Mods/Avatar`` (same with the profile background in ``Mods/Background``), located on the path above-mentioned.

#### NB : you can't install mods using the script if you already installed mods with this same script. If you try to do so, you will be given the choice to either uninstall all the old mods first and then install the new mods or stop the installation.

- ``--uninstall`` or ``-u`` is used to uninstall **all the mods** that have been installed with this script. It doesn't take any argument
- ``--version`` or ``-v`` is used to get the version of this script. The version will follow the versioning of the game itself. It doesn't take any argument
- ``--help`` or ``-h`` is used to get help about how to use the script. It doesn't take any argument

## Exemples

### Getting the version

``wotb -v``

### Installing the PC gun sounds, PC crew voices male and the extended tech tree mods

``wotb -i``

### Installing the PC gun sounds and the avatar image change mods

``wotb -i guns avatar``

### Uninstalling the mods

``wotb -u``
