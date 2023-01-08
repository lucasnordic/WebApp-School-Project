# Backend and Frontend Template

Latest version: https://git.ita.chalmers.se/courses/dit341/group-00-web (public Github [mirror](https://github.com/dit341/group-00-web))

## Project Structure

| File        | Purpose           | What you do?  |
| ------------- | ------------- | ----- |
| `server/` | Backend server code | All your server code |
| [server/README.md](server/README.md) | Everything about the server | **READ ME** carefully! |
| `client/` | Frontend client code | All your client code |
| [client/README.md](client/README.md) | Everything about the client | **READ ME** carefully! |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Free online production deployment | Deploy your app online in production mode |
| [docs/LOCAL_DEPLOYMENT.md](docs/LOCAL_DEPLOYMENT.md) | Local production deployment | Deploy your app local in production mode |

## Requirements

The version numbers in brackets indicate the tested versions but feel free to use more recent versions.
You can also use alternative tools if you know how to configure them (e.g., Firefox instead of Chrome).

* [Git](https://git-scm.com/) (v2) => [installation instructions](https://www.atlassian.com/git/tutorials/install-git)
  * [Add your Git username and set your email](https://docs.gitlab.com/ce/gitlab-basics/start-using-git.html#add-your-git-username-and-set-your-email)
    * `git config --global user.name "YOUR_USERNAME"` => check `git config --global user.name`
    * `git config --global user.email "email@example.com"` => check `git config --global user.email`
  * > **Windows users**: We recommend to use the [Git Bash](https://www.atlassian.com/git/tutorials/git-bash) shell from your Git installation or the Bash shell from the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run all shell commands for this project.
* [Chalmers GitLab](https://git.ita.chalmers.se/) => Login with your **Chalmers CID** choosing "Sign in with" **Chalmers Login**. (contact [support@chalmers.se](mailto:support@chalmers.se) if you don't have one)
  * DIT341 course group: https://git.ita.chalmers.se/courses/dit341
  * [Setup SSH key with Gitlab](https://docs.gitlab.com/ee/ssh/)
    * Create an SSH key pair `ssh-keygen -t ed25519 -C "email@example.com"` (skip if you already have one)
    * Add your public SSH key to your Gitlab profile under https://git.ita.chalmers.se/profile/keys
    * Make sure the email you use to commit is registered under https://git.ita.chalmers.se/profile/emails
  * Checkout the [Backend-Frontend](https://git.ita.chalmers.se/courses/dit341/group-00-web) template `git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git`
* [Server Requirements](./server/README.md#Requirements)
* [Client Requirements](./client/README.md#Requirements)

## Getting started

```bash
# Clone repository
git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git

# Change into the directory
cd group-00-web

# Setup backend
cd server && npm install
npm run dev

# Setup frontend
cd client && npm install
npm run serve
```

> Check out the detailed instructions for [backend](./server/README.md) and [frontend](./client/README.md).

## Visual Studio Code (VSCode)

Open the `server` and `client` in separate VSCode workspaces or open the combined [backend-frontend.code-workspace](./backend-frontend.code-workspace). Otherwise, workspace-specific settings don't work properly.

## System Definition (MS0)

### Website link
* https://fierce-atoll-00561.herokuapp.com/

### Purpose

Walkman:

It is a safe environment where pet owners find care for their any kind of pets (dogs, cats, hamsters, etc) while they are traveling daily or staying overnight or even they are a few days off. Pet owners are able to find reliable people through the system by reading through about their ads. We call these people, "Pet Lovers". our application is going to have e-mailing option between the users - pet owners and pet lovers - to be able to exchange information.

Walkman will provide an opportunity for pet lovers to offer their services to pet owners. Services which is offered by a pet lover can be a veterinary service, a walking service, a beauty service and even a housing service - called hostel in the application. When pet owners would like to take some time off of their pets, Walkman would be their platform to find the help.

### Pages

* [**Home page**](https://fierce-atoll-00561.herokuapp.com/register)**:** 
Login through the navigation bar for the users who would like to log in to the system. There is information through slide pictures about the purpose of the website. Thumbnails of services where a pet lover shares their purpose and their contact information. A pet owner can send an email to a pet lover through emailing option and can also read about the available services, the pet lover's detailed descriptions, and the possible prices for the available services.

* **[Register page](https://fierce-atoll-00561.herokuapp.com/register):** 
The page of pet lovers and pet owners where they can create an account to be able to log in to the system.

* **[Login page](https://fierce-atoll-00561.herokuapp.com/login):** 
The page of pet lovers and pet owners where they can log in to the system.

* **Service page:** 
The page of pet lovers where they can create their services, share their purposes and information to be able to earn money and provide services for those who need them.

* **Profile page:** 
Pet owners and pet lovers can create and edit their profiles.

* **[About page](https://fierce-atoll-00561.herokuapp.com/about):** 
All users of the web applications such as pet owners and pet lovers can read about the system creators.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/finalEr.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
