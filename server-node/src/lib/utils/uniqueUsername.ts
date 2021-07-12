import { UserModel } from '../../schema/user.schema';
import { limitString } from './limitString';

const random: string | any = async (str: string, randomLength: number = 3) => {
  str += [...Array(randomLength)]
    .map((_) => (~~(Math.random() * 36)).toString(36))
    .join('');
  const usernameExist = await UserModel.findOne({ username: str });
  if (usernameExist) return random(str, randomLength + 1);
  else return str;
};

export const uniqueUsername = async (str: string) => {
  const strArr = str.toLocaleLowerCase().split(' ');
  const result =
    strArr.length >= 3
      ? [strArr[0], strArr[strArr.length - 1]].join('')
      : strArr.join('');

  const usernameExist = await UserModel.findOne({ username: str });
  if (!usernameExist) return random(limitString(result, 10));
  else uniqueUsername(result);
};
