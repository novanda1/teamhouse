import { UserModel } from '../../schema/user.schema';

const random: string | any = async (str: string) => {
  str += [...Array(10)]
    .map((_) => (~~(Math.random() * 36)).toString(36))
    .join('');
  const usernameExist = await UserModel.findOne({ username: str });
  if (usernameExist) return random(str);
  else return str;
};

export const uniqueUsername = async (str: string) => {
  str.toLocaleLowerCase().split(' ').join('_');
  const usernameExist = await UserModel.findOne({ username: str });
  if (usernameExist) return random(str);
  else return str;
};
