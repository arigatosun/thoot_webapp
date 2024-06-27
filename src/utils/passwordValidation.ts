export function validatePassword(password: string): boolean {
    if (password.length < 8) {
      return false;
    }
  
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    return true;
  }
  
  export function getPasswordValidationMessage(password: string): string {
    if (password.length < 8) {
      return 'パスワードは8文字以上である必要があります。';
    }
  
    if (!/[A-Z]/.test(password)) {
      return 'パスワードには大文字を1つ以上含める必要があります。';
    }
  
    return '';
  }
  