import MainPage from "../pages/MainPage";
import TopFilms from "../pages/TopFilms";
import FilmPage from "../pages/FilmPage";
import SearchedFilmsPage from "../pages/SearchedFilmsPage";
import LoginPage from "../pages/LoginPage";
import AccountPage from "../pages/AccountPage";

export const publicRoutes = [
    {path: '/upcoming', component: MainPage, exact: true},
    {path: '/top_rated', component: TopFilms, exact: true},
    {path: '/film/:id', component: FilmPage, exact: true},
    {path: '/search', component: SearchedFilmsPage, exact: true},
    {path: '/login', component: LoginPage, exact: true},
]

export const privateRoutes = [
    {path: '/upcoming', component: MainPage, exact: true},
    {path: '/top_rated', component: TopFilms, exact: true},
    {path: '/film/:id', component: FilmPage, exact: true},
    {path: '/search', component: SearchedFilmsPage, exact: true},
    {path: '/account', component: AccountPage, exact: true}
]