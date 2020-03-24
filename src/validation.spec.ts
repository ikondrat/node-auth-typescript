import { validateLogin, validateRegistration } from './validation';

describe('validation tools', () => {
  describe('validateLogin', () => {
    it('has error', () => {
      const res = validateLogin({
        email: 'test',
        password: 'aksdamsldalksdmaslkdm'
      });
      expect(res.error).toBeTruthy();
    });
    it('has not error', () => {
      const res = validateLogin({
        email: 'test@gmail.com',
        password: 'aksdamsldalksdmaslkdm'
      });
      expect(res.error).toBeFalsy();
    });
  })

  describe('validateRegistration', () => {
    it('has error', () => {
      const res = validateRegistration({
        name:'Ed',
        email: 'test',
        password: 'aksdamsldalksdmaslkdm'
      });
      expect(res.error).toBeTruthy();
    });
    it('has not error', () => {
      const res = validateRegistration({
        name:'Ed Thompson',
        email: 'test@gmail.com',
        password: 'aksdamsldalksdmaslkdm'
      });
      expect(res.error).toBeFalsy();
    });
  })
  
});
