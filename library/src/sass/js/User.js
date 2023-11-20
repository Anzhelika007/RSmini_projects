export class User {
    constructor(id, firstName, lastName, email, password, card, countBooks, countEnter, bonuses, profileIcon) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.card = card;
        this.countBooks = countBooks;
        this.countEnter = countEnter;
        this.bonuses = bonuses;
        this.profileIcon = profileIcon;
    }
    saveLocally() {
        localStorage.setItem(`${this.id}:id`, this.id);
        localStorage.setItem(`${this.id}:firstName`, this.firstName);
        localStorage.setItem(`${this.id}:lastName`, this.lastName);
        localStorage.setItem(`${this.id}:email`, this.email);
        localStorage.setItem(`${this.id}:password`, this.password);
        localStorage.setItem(`${this.id}:card`, this.card);
        localStorage.setItem(`${this.id}:countBooks`, this.countBooks);
        localStorage.setItem(`${this.id}:countEnter`, this.countEnter);
        localStorage.setItem(`${this.id}:bonuses`, this.bonuses);
        localStorage.setItem(`${this.id}:profileIcon`, this.profileIcon);
    }
    getUserAttribute(id, userAttribute) {
        localStorage.getItem(`${id}:${userAttribute}`);
    }

}










