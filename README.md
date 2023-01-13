![Foundry Core Compatible Version](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dfor-the-badge%26url%3Dhttps%3A%2F%2Fgithub.com%2Fsnshatto%2Fdeadly-encounter-benchmark%2Freleases%2Fdownload%2Fv1.1.0%2Fmodule.json)
![Latest Version](https://img.shields.io/github/v/release/snshatto/deadly-encounter-benchmark?color=Red&include_prereleases&label=Latest%20Release&sort=date&style=for-the-badge)

# Changelog
v1.2.3
- fixed a bug where Friendly NPC CR would not be added to the  Deadly Encounter Benchmark if the "Display as fraction" option was enabled.

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


# Description
Foundry VTT Module. Help determine the difficulty of combat encounters using this benchmark method. Modeled after [Sly Flourish's Lazy DM Prep](https://slyflourish.com/).

A <i>Deadly Encounter Benchmark</i> is a guideline that helps determine an encounter's difficulty.

An encounter may be deadly if the total of all the monsters' challenge ratings is greater than one quarter of the total of all the characters' levels, or one half of the characters' levels if the characters are 5th level or higher.

If friendly NPCs join the encounter, their CR values are added to the <i>Deadly Encounter Benchmark</i>.

Once installed and actived, a <i>Deadly Encounter Benchmark</i> button will appear under the Token Controls menu. Click to activate.

<img src="https://user-images.githubusercontent.com/112721768/210635088-25a77556-ad09-4be0-8f3f-36e586513ae8.png" width="500"> 
With selected token highlights:
<img src="https://user-images.githubusercontent.com/112721768/210635322-238d2846-307b-4af7-952c-baf02f5f342a.png" width="500">
As a chat message:
<img src="https://user-images.githubusercontent.com/112721768/210635205-70d0f079-99c0-4e9b-94cb-fc582bbcd05b.png" width="200">
