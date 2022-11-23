// import IUser from '../Interfaces/Iuser';
// import { User } from '../models';

// const create = async (body: IUser) => {
//   const { email, password } = body;
//   if (!email || !password) {
//     return {
//       type: 'camposInvalidos', message: 'All fields must be filled',
//     };
//   }
//   const user = await User.findOne({
//     where: { email },
//   });
//   if (!user || user.password !== password) {
//     return {
//       type: 'invalidValue', message: 'Incorrect email or password',
//     };
//   }
//   const token = gerateToken();
// };

// export default {
//   create,
// };
