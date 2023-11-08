import { Languages } from './enums';

export class MyError {

    public static SERVER_UNKNOWN_ERROR = new MyError(
        'Неизвестная ошибка',
        'Unknow error',
        "Noma'lum xato",
        false,
        100
    );
    public static DUPLICATE_ITEM = new MyError(
        'Договор с уникальным номером заявки уже есть',
        'Repeated element',
        'Takrorlangan malumot',
        false,
        101
    );

    public static USER_NOT_FOUND = new MyError(
        'Пользователь не найден',
        'User not found',
        'Foydalanuvchi topilmadi',
        true,
        102
    );
    public static INVALID_USERNAME_OR_PASSWORD = new MyError(
        'Неверное имя Пользователя или Пароль',
        'Invalid username or password',
        "Kiritgan Foydalanuvchi nomi yoki parol noto'g'ri",
        true,
        103
    );

    public static INVALID_TOKEN = new MyError(
        'Токен неверный',
        'Token invalid',
        "Token noto'g'ri",
        true,
        104
    );
    public static TOKEN_EXPIRED = new MyError(
        'Время токена истек',
        'Token expired',
        'Token vaqti tugagan',
        true,
        105
    );
    public static UNAUTHORIZED = new MyError(
        'Вы не авторизованы',
        'Unauthorized',
        'Royxatdan otmagansiz',
        true,
        106
    );

    public static ERROR_GENERATE_JWT = new MyError(
        'Oшибка генерации токена jwt',
        'Error generating jwt token',
        'JWT token generatsiya qilishda xatolik',
        false,
        109
    );

    public static ITEM_NOT_FOUND = new MyError(
        'Элемент не найден',
        'Item not found',
        'Element topilmadi',
        false,
        112
    );

    public static INVALID_OLD_PASSWORD = new MyError(
        'Старый пароль неверный',
        'Old password is wrong',
        "Eski parol noto'g'ri",
        true,
        118
    );

    public static INVALID_OLD_NEW_PASSWORD_MATCH = new MyError(
        'Новый пароль не может совпадать со старым паролем',
        'New password cannot equal to old password',
        "Yangi parol eski paroldan farqli bo'lishi kerak kerak",
        true,
        119
    );

    public static INVALID_NEW_PASSWORD_REPEAT_DONT_MATCH = new MyError(
        'Подтвердить пароль не совпадает с новым паролем',
        'Confirm password does not matches with new password',
        'Tasdiqlash paroli yangi parol bilan bir xil emas',
        true,
        120
    );

    public static USER_LOGIN_EXISTS = new MyError(
        'Логин пользователя существует',
        'User login exists',
        'Foydalanuvchi logini mavjud',
        true,
        121
    );

    constructor(
        textRu: string,
        textEn: string,
        textUz: string,
        isFriendly: boolean,
        errId: number
    ) {

        this.textRu = textRu;
        this.textEn = textEn;
        this.textUz = textUz;
        this.isFriendly = isFriendly;
        this.errId = errId;
    
    }

    readonly textRu: string;
    readonly textEn: string;
    readonly textUz: string;
    readonly isFriendly: boolean;
    readonly errId: number;

    public static getErrorByLang(
        error: MyError,
        langId: number = Languages.EN
    ): any {

        switch (langId) {

            case Languages.EN:
                return {
                    errId: error.errId,
                    errorMessage: error.textEn,
                    isFriendly: error.isFriendly
                };
            case Languages.RU:
                return {
                    errId: error.errId,
                    errorMessage: error.textRu,
                    isFriendly: error.isFriendly
                };
            case Languages.UZ:
                return {
                    errId: error.errId,
                    errorMessage: error.textUz,
                    isFriendly: error.isFriendly
                };
        
        }
    
    }

    public static getErrorIdByError(error: MyError): number {

        return error.errId;
    
    }

    public static getErrorByErrId(
        errId: number,
        langId: number = Languages.EN
    ): any {

        switch (errId) {

            case 100:
                return MyError.getErrorByLang(MyError.SERVER_UNKNOWN_ERROR, langId);
            case 101:
                return MyError.getErrorByLang(MyError.DUPLICATE_ITEM, langId);
            case 102:
                return MyError.getErrorByLang(MyError.USER_NOT_FOUND, langId);
            case 103:
                return MyError.getErrorByLang(
                    MyError.INVALID_USERNAME_OR_PASSWORD,
                    langId
                );
            case 104:
                return MyError.getErrorByLang(MyError.INVALID_TOKEN, langId);
            case 105:
                return MyError.getErrorByLang(MyError.TOKEN_EXPIRED, langId);
            case 106:
                return MyError.getErrorByLang(MyError.UNAUTHORIZED, langId);
            case 109:
                return MyError.getErrorByLang(MyError.ERROR_GENERATE_JWT);
            case 112:
                return MyError.getErrorByLang(MyError.ITEM_NOT_FOUND);
            case 118:
                return MyError.getErrorByLang(MyError.INVALID_OLD_PASSWORD, langId);
            case 119:
                return MyError.getErrorByLang(
                    MyError.INVALID_OLD_NEW_PASSWORD_MATCH,
                    langId
                );
            case 120:
                return MyError.getErrorByLang(
                    MyError.INVALID_NEW_PASSWORD_REPEAT_DONT_MATCH,
                    langId
                );
            case 121:
                return MyError.getErrorByLang(MyError.USER_LOGIN_EXISTS, langId);
            case 122:
                return MyError.getErrorByLang(MyError.USER_LOGIN_EXISTS, langId);
            case 123:
        
        }
    
    }

}
