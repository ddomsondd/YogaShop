## Ogólne informacje o projekcie

Projekt strony sklepu internetowego z ubraniami oraz akcesoriami do ćwiczenia jogi.
Powstał w celu zaliczenia przedmiotu " Szkielety programistyczne w aplikacjach internetowych".
Projekt powstał w technologiach:
- React JS - biblioteka JavaScript do budowania interfejsów użytkownika,
- Express & Node JS - zostały wykorzystane do tworzenia backendu aplikacji, obsługi żądań HTTP oraz zarządzania logiką,
- MongoDB - nierelacyjna baza danych użyta do przechowywania danych o produktach oraz użytkownikach.
Zostały użyte narzędzia :
- CSS do obsługi styli interfejsu użytkownika,
- Multer - middleware Node.js do obsługi przesyłania plików (np. zdjęć) do serwera,
- bcrypt - biblioteka do szyfrowania haseł,
- JWT - standard autoryzacji użyty do bezpiecznej autoryzacji użytkowników w aplikacji,
- Cors - umożliwia kontrolowany dostęp do zasobów na innych domenach w bezpieczny sposób,
- React Router - biblioteka do zarządzania trasami w aplikacjach React.

## Wymagania

- React 18.3.1
- React Router Dom 6.23.1
- Express 4.19.2 
- Node v21.5.0
- MongoDB 8.4.1
- npm 10.7.0
- Multer 1.4.5-lts.1
- JWT 9.0.2
- bcrypt 5.1.1
- Cors 2.8.5


## Instalacja

1. Pobrać, a następnie rozpakować folder 'Projekt'.
2. W folderze projektu otworzyć zintegrowany terminal dla folderu 'frontend', a następnie wprowadzić polecenia:
	2.1. npm install
	2.2. npm install react-router-dom
3. W folderze projektu otworzyć zintegrowany terminal dla folderu 'backend', a następnie wprowadzić polecenia:
	3.1. npm install express 
	3.2. npm install jsonwebtoken
	3.3. npm install mongoose
	3.4. npm install multer
	3.5. npm install cors
4. W folderze projektu otworzyć zintegrowany terminal dla folderu 'admin', a następnie wprowadzić polecenia:
	4.1. npm install
5. W terminalu folderu 'frontend' wpisać komendę: 'npm start'.
6. W terminalu folderu 'backend' wpisać komendę: 'node .\index.js'.
7. W terminalu folderu 'admin' wpisać komendę: 'npm run dev'.
8. Strona sklepu dostępna pod adresem: 'http://localhost:3000/'.
9. Strona panelu administratora dostępna pod adresem: 'http://localhost:5173/'.


## Przykładowe konta do logowania

- Karol:
	* Email: k.kowalski@gmail.com
	* Hasło: karol
- Dominika:
	* Email: dom.dob@op.pl
	* Hasło: password
