export class TestCases {
  static EMAIL = [
    {email: 'invalidemailzerzer', valid: false},
    {email: 'stillinvalid@invalid', valid: false},
    {email: 'stillinvalid@invalid.', valid: false},
    {email: 'stillinvalid@invalid.c', valid: false},
    {email: '@invalid.com', valid: false},
    {email: 'no white space@invalid.com', valid: false},
    {email: 'correctemail@gmail.com', valid: true},
    {email: 'allow_please@yahoo.fr', valid: true},
    {email: 'numbers12345678900too@hotmail.ru', valid: true},
  ];

  static PASSWORD = [
    {password: 'short', valid: false},
    {password: 'nonumbergoodlength', valid: false},
    {password: 'numberbutnocaps0', valid: false},
    {password: 'numberbutnoSpecial0', valid: false},
    {password: 'sh0rT.', valid: false},
    {password: 'ThisIsC0rrect.', valid: true},
    {password: 'Passw0rd#', valid: true},
    {password: 'AsoooooooooooooooL0123456789ngPass#./€!', valid: true},
    {password: 'OkAccentéèê123#', valid: true}
  ];
}
