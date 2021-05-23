fetch('https://29d89bd8-6bd3-4d00-a8f4-138eb4a1ef99.mock.pstmn.io/manifestoTest')
    .then((resp) => resp.json())
    .then((data) => {
        // extract data from response
        const {
            header,
            menu,
            title,
            footer,
            body
        } = data;

        // remove loader if response is succesful
        document.querySelector('.loader').style.display = "none";

        // add content
        addContent('.main-body-copy', body);
        addContent('footer', footer);
        addContent('.header-nav', createNav(menu));
        appendContent('.header', 'h1', header);
        appendContent('.main-intro', 'h2', title);
    })
    .catch((error) => {
        console.log('error ', error);
    });

const createNav = (menu) => {
    return `<ul class="header-nav-menu"> ${menu.map(link => link.submenu ? `<li class="header-nav-submenu-trigger"> <a href="${link.url}">${link.title} <i class="arrow"></i></a> <ul class="header-nav-submenu">${link.submenu.map(sublink => `<li><a href="${sublink.url}">${sublink.title}</a></li>`).join('')}</ul></li>` : `<li><a href="${link.url}">${link.title}</a></li>`).join('')} </ul>`;
}

const addContent = (selector, content) => {
    document.querySelector(selector).innerHTML = content;
}

const appendContent = (selector, node, text) => {
    const content = document.createElement(node);
    content.textContent = text;
    document.querySelector(selector).append(content);
}