import { CreateChatTeamInputsDTO } from '../../lib/dto/chatTeamInput.dto';
import { ChatTeam, ChatTeamModel, Message } from '../../schema/chatTeam.schema';
import { UserService } from '../user.service';

/**
 * @todo make this better
 * @body hard to read
 */
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

  constructor(
    private readonly model = ChatTeamModel,
    private readonly userService = new UserService(),
  ) {}

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
      user: (await this.userService.find(m.userId)) || undefined,
      createdAt,
    };

    let queryChatTeam = (await this.model.findOne({ teamId })) as ChatTeam;

    const add = async () =>
      await this.model.updateOne({ teamId }, { $push: { messages: message } });

    if (!queryChatTeam)
      this.create({ teamId }).then(async () => {
        await add();
      });
    else {
      await add();
    }

    const messages: Message[] = [
      ...(queryChatTeam.messages?.map(async (m: Message) => {
        return await this.userService.find(m.userId).then((user) => {
          return { user, ...m };
        });
      }) as Message[] & any),
    ];

    return await Promise.all(messages).then((m) => {
      queryChatTeam.messages = m;
      return queryChatTeam;
    });
  }

  async create(options: CreateChatTeamInputsDTO): Promise<ChatTeam> {
    const chatTeam = await this.model.create(options);
    chatTeam instanceof ChatTeam;

    return chatTeam;
  }

  async find(teamId: string): Promise<ChatTeam> {
    let queryChatTeam = (await this.model.findOne({ teamId })) as ChatTeam;

    const messages: any = [
      ...(queryChatTeam.messages?.map(async (m: Message) => {
        return await this.userService.find(m.userId).then((user) => {
          return { user, ...m };
        });
      }) as Message[] & any),
    ];

    return await Promise.all(messages).then(() => {
      queryChatTeam.messages = messages;
      const result: any = queryChatTeam;
      return result;
    });
  }
}
