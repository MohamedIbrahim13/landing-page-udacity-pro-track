/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const body = document.querySelector('body');
const header = document.querySelector('.page__header');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('#navbar__list');
const headings = document.querySelectorAll('.landing__container h2');




/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/* highlight section when scrolled into the view */
const hightlighSection = (section, link) => {
    window.addEventListener('scroll', (e) => {
        e.preventDefault();
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight && rect.top >= 0) {
            section.classList.add('your-active-class');
            link.classList.add('active-link');
        } else {
            section.classList.remove('your-active-class');
            link.classList.remove('active-link');
        }
    });
};

/* add To Top Button  */
const addElement = () => {
    const button = document.createElement('button');
    const footer = document.querySelector('footer');
    const newContent = document.createTextNode("To Top");

    // add the text node to the newly created button
    button.appendChild(newContent);
    document.body.insertBefore(button, footer);
};

/* get the collapsible siblings */

const getSiblings = (e) => {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */



// build the nav

sections.forEach((section, index, array) => {
    const itemName = section.getAttribute('data-nav');
    const itemID = array[index].getAttribute('id');
    navbar.innerHTML += `<li><a id="${itemID}" class="menu__link">${itemName}</a></li>`;

});



// Add class 'active' to section when near top of viewport

const navLinks = document.querySelectorAll('.menu__link');

navLinks.forEach(navlink => {
    navlink.addEventListener('click', (e) => {
        e.preventDefault();

        sections.forEach(section => {
            if (section.getAttribute('id') === navlink.getAttribute('id')) {

                section.scrollIntoView({
                    behavior: 'smooth'
                });

                hightlighSection(section, navlink);

            };


        });

    });
});



addElement();
const scrollButton = document.querySelector('button');
const scrollFunction = () => {
    if (document.body.scrollTop > 2500 || document.documentElement.scrollTop > 2500) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
scrollButton.addEventListener('click', (e) => {
    topFunction();
});
window.onscroll = function () {
    scrollFunction()
};


// Collapsible sections
headings.forEach(heading => {
    let siblings = getSiblings(heading);
    heading.addEventListener('click', (e) => {
        e.preventDefault();
        siblings.forEach(child => {
            if (child.style.display === "block") {
                child.style.display = "none";
            } else {
                child.style.display = "block";
            }
        });
    });

});
