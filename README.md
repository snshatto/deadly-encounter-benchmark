![Foundry Core Compatible Version](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dfor-the-badge%26url%3Dhttps%3A%2F%2Fgithub.com%2Fsnshatto%2Fdeadly-encounter-benchmark%2Freleases%2Fdownload%2Fv3.0.0%2Fmodule.json)
![Latest Version](https://img.shields.io/github/v/release/snshatto/deadly-encounter-benchmark?color=Red&include_prereleases&label=Latest%20Release&sort=date&style=for-the-badge)
![Downloads](https://img.shields.io/github/downloads/snshatto/deadly-encounter-benchmark/total?style=for-the-badge&color=199DDA)

# Description
Foundry VTT Module. Help determine the difficulty of combat encounters using this benchmark method. Modeled after [Sly Flourish's Lazy DM Prep](https://slyflourish.com/), and detailed in The Lazy DM's Forge of Foes (https://shop.slyflourish.com/products/forge-of-foes), authored by Teos Abadia, Scott Fitzgerald, and Michael E. Shea.

A <i>Deadly Encounter Benchmark</i> is a guideline that helps determine an encounter's difficulty.

An encounter might be deadly if the sum total of monster challenge ratings is greater than:
- 1/4 of the sum total of character levels, for characters of 1st to 4th level;
- 1/2 of the sum total of character levels, for characters of 5th to 10th level;
- 3/4 of the sum total of character levels, for characters of 11th to 16th level;
- equal to the sum total of character levels, for characters 17th level or higher.

If friendly NPCs join the encounter, their CR values are added to the <i>Deadly Encounter Benchmark</i>.

A deadly encounter means:
- Most characters might lose more than half their hit points.
- Several characters might go unconscious.
- There’s a chance that one or more characters might die.

Once installed and actived, a <i>Deadly Encounter Benchmark</i> button will appear under the Token Controls menu.

<img src="https://github.com/user-attachments/assets/6899dc8b-64f7-4a9e-a18f-c2e362880aae" width="200"> 

Click to activate.

<img src="https://github.com/user-attachments/assets/11d90e6d-8582-4d53-8f69-df3b616a17fb" width="500"> 

# Changelog
v3.0.0
- Complete re-write and re-styling of the module
- Updated for Foundry V13
- Updated for V2 Application Framework
- Token images are clickable and open up associated character sheet
- Added a "Recalculate" button to the dialog box that will recalculate the Deadly Encounter Benchmark
  
v2.0.1
- Updated for latest version of Foundry
  
v2.0.0
This is a major re-work of the module. Changes include:

- Module style updated to fit the DND5e 3.0.0 system release
- Module settings have been removed to simplify the module. Now, the module will only display the Deadly Encounter Benchmark dialog box
- Chat option has been removed
- Tool tip option has been removed. Instead, a tool tip will automatically display when hovering over the "Deadly," "Challenging","or "Not Deadly" text that explains the rating
- Outline option has been removed
- Module has been updated to reflect the recent changes to the Lazy Encounter Benchmark, as noted in The Forge of Foes (https://shop.slyflourish.com/products/forge-of-foes) authored by Teos Abadia, Scott Fitzgerald Gray, and Michael E. Shea.
  
v1.3.2
- Updated to latest Foundry version

v1.3.1
- removed the border around each token in the DEBM dialog

v1.3.0
- Updated for v11
- Removed the "display as fraction" option. This is now the default
- Pop-up now displays selected token image. When hovered with mouse, will display the token CR or level

v1.2.4
- Fixed an issue where Deadly Encounter Benchmark caused the AC in the default character sheet to change position and keep the tooltip up permanently when hovered over with mouse.

v1.2.3
- Fixed a bug where Friendly NPC CR would not be added to the  Deadly Encounter Benchmark if the "Display as fraction" option was enabled.

v1.2.2
- Quick code fix

v1.2.1
- Added a warning message if the "Display Token Outline" option is enable but Token Magic FX is not enable or not installed

v1.2.0
- Refined the dialog pop-up display to be similar to ironmonk88's "Monks Little Details."
- Added a tooltip option to display a tooltip that helps explain the Deadly Encounter Benchmark calculation.
- Added an option to display the Deadly Encounter Benchmark as a chat message, rather than a pop-up dialog box.

v1.1.0
- Added a settings menu
- Added an option to make all values under "1" show up as a fraction (similar to how CR is traditionally represented in 5e)
- Added an option to display a highlight around all selected tokens when the Deadly Encounter Benchmark is activated. This makes it a bit easier to see which tokens are included in the calculation. This can be slow if there are too many tokens selected. Recommended use only when a few tokens are selected. This option REQUIRES the [Token Magic FX](https://github.com/Feu-Secret/Tokenmagic) module to also be installed an activated.
