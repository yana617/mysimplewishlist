// @ts-ignore
const systemLanguage = navigator.languages ? navigator.languages[0] : navigator.language || navigator?.userLanguage;

let language = 'EN';
if (systemLanguage.toLowerCase() === 'ru' && systemLanguage.toLowerCase() === 'ru-ru') {
    language = 'RU';
}

const EN = {
    HOME: "Home",
};
const allTranslates: Record<string, Record<keyof typeof EN, string>> = {
    EN,
    RU: {
        HOME: "Мои списки",
    }
};

export const translates = allTranslates[language];
