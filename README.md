![Featured](https://user-images.githubusercontent.com/26682297/210121033-ff4c3a99-ee49-4ba3-bd39-07556ee6a097.jpg)

Project developed in order to improve software development skills. The project is based on the tic-tac-toe game, known worldwide.

- [Technologies](#technologies)
- [How to run](#how-to-run)
- [Hygraph](#hygraph)
- [Environment variables](#environment-variables)
- [Preview](#preview)
- [License](#license)

<a id="technologies"></a>

## ✨ Technologies

This project was developed with the following technologies:

- React
- Vite
- TypeScript
- CSS Modules
- GraphQl
- Apollo Client

<a id="how-to-run"></a>

## 🚀 How to run

- Clone the repository

```bash
git clone https://github.com/igorssc/tic-tac-toe.git

cd tic-tac-toe
```

- Install dependencies

```bash
yarn

# or

npm init
```

- Put your environment variables in a file .env at the root of the project

- Start the server

```bash
yarn dev --port 3000

# or

npm run dev -- --port 3000
```

You can now access [`localhost:3000`](http://localhost:3000) from your browser.

<a id="hygraph"></a>

### 🎲 Hygraph

To configure the content storage service, you must follow a few steps:

1. Go to the website <https://hygraph.com> and create a new project;

2. Create a schema model, named "Record", as in the image below:

<img src="https://user-images.githubusercontent.com/26682297/210855506-8b601207-af2a-4759-a904-31a4bbe7de84.png" width="600em">

3. In the project settings, copy your Master Environment Url:

<img src="https://user-images.githubusercontent.com/26682297/191612090-d52375b4-2cdf-4151-8edd-8dfab439f5da.png" width="600em">

> It will be used in the environment variables

4. Create an Permanent Access Token:

<img src="https://user-images.githubusercontent.com/26682297/191612108-5abae9a8-be7a-475b-8c88-a64d8ee9dfdf.png" width="600em">

5. Change the permissions of your permanent access token, and leave it as below:

<img src="https://user-images.githubusercontent.com/26682297/210869680-38c120dc-f058-464a-8a11-c9fd7402c476.png" width="600em">

<a id="environment-variables"></a>

### 🔐 Environment variables

In this project, `environment variables are used`, to connect with the content storage service [hygraph](https://hygraph.com/).

For the correct operation of the system, the following environment variables must be used:

```
VITE_API_URL=your-hygraph-master-environment-url

VITE_API_ACCESS_TOKEN=your-hygraph-permanent-token
```

<a id="preview"></a>

## 🪄 Preview

Access <https://tic-tac-toe-igorssc.vercel.app>

<a id="license"></a>

## 📝 License

This project is under MIT license. See the archive [LICENSE](LICENSE.md) to more details.

---

Made with 💜 by [IGS Design](https://igsdesign.com.br) - Igor Santos 👋
