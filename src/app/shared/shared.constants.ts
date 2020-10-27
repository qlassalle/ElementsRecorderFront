export class SharedConstants {
  static EMAIL_REGEX = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  static PASSWORD_REGEX = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ -/:-@-`{|}~é-ñ]).{8,}$';
}
