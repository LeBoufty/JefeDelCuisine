import { ChatInputCommand, Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { smashCharacters } from '../data/characters.json';
import { smashInputs } from '../data/inputs.json';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Command.Options>({
    name: 'randomize',
    description: 'Donne un personnage et des inputs aléatoires'
})
export class RandomizeCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
		super(context, { ...options });
	}
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
                .addStringOption((option) => option.setName('torandomize').setDescription('Ce que tu veux randomizer').setRequired(true).addChoices({name: 'Personnage', value: 'personnage'}, {name: 'Inputs', value: 'inputs'}))
                .addStringOption((option) => option.setName('voice').setDescription('Comment sont communiqués les résultats').setRequired(false).addChoices({name: 'Public', value: 'public'}, {name: 'Privé', value: 'prive'})),
        {guildIds: [process.env.GUILD_ID as string]});
    }
    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        var prive = true;
        const toRandomize = interaction.options.getString('torandomize', true);
        const voice = interaction.options.getString('voice', false);
        const embed = new EmbedBuilder();
        if (voice == 'public') prive = false;
        switch (toRandomize) {
            case 'personnage':
                const randomCharacter = smashCharacters[Math.floor(Math.random() * smashCharacters.length)];
                embed.setTitle(randomCharacter.name).setImage(randomCharacter.icon);
                break;
            case 'inputs':
                const randomInputs = {
                    'ZL': smashInputs.ZL[Math.floor(Math.random() * smashInputs.ZL.length)],
                    'ZR': smashInputs.ZR[Math.floor(Math.random() * smashInputs.ZR.length)],
                    'L': smashInputs.L[Math.floor(Math.random() * smashInputs.L.length)],
                    'R': smashInputs.R[Math.floor(Math.random() * smashInputs.R.length)],
                    'A': smashInputs.A[Math.floor(Math.random() * smashInputs.A.length)],
                    'B': smashInputs.B[Math.floor(Math.random() * smashInputs.B.length)],
                    'X': smashInputs.X[Math.floor(Math.random() * smashInputs.X.length)],
                    'Y': smashInputs.Y[Math.floor(Math.random() * smashInputs.Y.length)],
                    'Haut': smashInputs.Up[Math.floor(Math.random() * smashInputs.Up.length)],
                    'Bas': smashInputs.Down[Math.floor(Math.random() * smashInputs.Down.length)],
                    'Côté': smashInputs.Side[Math.floor(Math.random() * smashInputs.Side.length)],
                    'Stick Droit': smashInputs.RStick[Math.floor(Math.random() * smashInputs.RStick.length)],
                    'Vibrations': smashInputs.Vibrations[Math.floor(Math.random() * smashInputs.Vibrations.length)],
                    'B+A Smash': smashInputs.BA_Smash[Math.floor(Math.random() * smashInputs.BA_Smash.length)],
                    'Saut Rapide': smashInputs.Saut_Rapide[Math.floor(Math.random() * smashInputs.Saut_Rapide.length)],
                    'Sensibilité': smashInputs.Sensibilite[Math.floor(Math.random() * smashInputs.Sensibilite.length)],
                };
                embed.setTitle('Tes inputs sont :')
                    .setDescription(`ZL : ${randomInputs.ZL}\nZR : ${randomInputs.ZR}\nL : ${randomInputs.L}\nR : ${randomInputs.R}\nA : ${randomInputs.A}\nB : ${randomInputs.B}\nX : ${randomInputs.X}\nY : ${randomInputs.Y}\nHaut : ${randomInputs.Haut}\nBas : ${randomInputs.Bas}\nCôté : ${randomInputs.Côté}\nStick Droit : ${randomInputs['Stick Droit']}\nVibrations : ${randomInputs.Vibrations}\nB+A Smash : ${randomInputs['B+A Smash']}\nSaut Rapide : ${randomInputs['Saut Rapide']}\nSensibilité : ${randomInputs.Sensibilité}`);
                break;
            default:
                embed.setTitle('Erreur').setDescription('Ce que tu veux randomizer n\'est pas valide');
                break;
        }
        const msg = await interaction.reply({ embeds: [embed], ephemeral: prive });
        return msg;
    }
}
