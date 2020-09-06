import StartPage from "./views/pages/StartPage.js"
import SignInPage from "./views/pages/SignInPage.js"
import SignUpPage from "./views/pages/SignUpPage.js"
import ChatPage from "./views/pages/ChatPage.js";

export const routes = [
    // {
    //     path: '/',
    //     page: CocktailList,
    // },
    // {
    //     path: '/cocktail/:id',
    //     page: CocktailDetail,
    // },
    // {
    //     path: '/add',
    //     page: AddCocktail,
    // },
    // {
    //     path: '/login',
    //     page: Login,
    // },
    // {
    //     path: '/register',
    //     page: Register,
    // },
    {
        path: '/',
        page: StartPage,
    },
    {
        path: '/login',
        page: SignInPage,
    },
    {
        path: '/register',
        page: SignUpPage,
    },
    {
        path: '/chat',
        page: ChatPage,
    }
];

export default routes;