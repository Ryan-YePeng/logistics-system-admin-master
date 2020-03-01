import md5 from 'js-md5'

export const encrypt = password => {
  return md5('DrivingSchool' + md5(password) + 'AdminMasterSystem')
};
