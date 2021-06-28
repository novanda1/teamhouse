import { CreateChatTeamInputsDTO } from '../../lib/dto/chatTeamInputDTO';
import { ChatTeam, ChatTeamModel, Message } from '../../schema/chatTeamSchema';

export class ChatTeamService {
  private readonly colors = [
    '#ff2366',
    '#fd51d9',
    '#face15',
    '#8d4de8',
    '#6859ea',
    '#7ed321',
    '#56b2ba',
    '#00CCFF',
    '#FF9900',
    '#FFFF66',
  ];

  constructor(private readonly model = ChatTeamModel) {}

  private generateColorFromString(str: string) {
    let sum = 0;
    for (let x = 0; x < str.length; x++) sum += x * str.charCodeAt(x);
    return this.colors[sum % this.colors.length];
  }

  async addMessage(teamId: string, m: Message): Promise<ChatTeam | null> {
    const createdAt = new Date(Date.now());
    const message: Message = {
      ...m,
      color: this.generateColorFromString(m.userId),
      createdAt,
    };

    const messageCollection = await this.model.findOne({ teamId });

    const add = async () =>
      await this.model.updateOne({ teamId }, { $push: { messages: message } });

    if (!messageCollection)
      this.create({ teamId }).then(async () => {
        await add();
      });
    else {
      await add();
    }

    return messageCollection;
  }

  async create(options: CreateChatTeamInputsDTO): Promise<ChatTeam> {
    const chatTeam = await this.model.create(options);
    chatTeam instanceof ChatTeam;

    return chatTeam;
  }

  async find(teamId: string): Promise<ChatTeam | null> {
    return await this.model.findOne({ teamId });
  }
}
