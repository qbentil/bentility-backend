const WelcomeTEXT = (user) => {
    const { name, username, password, role, site } = user;
    return `
    Hello  ${name} - [${username}]!

    Welcome to the team!
    You are now a member of the team as a/an ${role}
    This is where you can share your tech ideas for fellow developers.
    
    Your password is: ${password}
        
    
    NB! Make sure to change your password after your first login. <br/> <br/>

    Login here: ${site}/admin <br/>
    Or visit blog here: ${site}/ <br/> <br/>
    
    Regards,
    Bentility Team`;
}
const WelcomeHTML = (user) => {
    const { name, username, password, role, site } = user;
    return `
    Hello  <i>${name} - [${username}]</i>! <br/>

    Welcome to the team! <br/>
    You are now a member of the team as a/an ${role}. <br/>
    This is where you can share your tech ideas for fellow developers. <br/> <br/>
    
    Your password is: <b>${password}</b>   <br/> <br/>
        
    
    <b>NB!</b> Make sure to change your password after your first login.   <br/> <br/>

    Login here: <a href="${site}/admin">${site}/admin</a> <br/>
    Or visit blog here: <a href="${site}/">${site}/</a> <br/> <br/>
    
    Regards,<br/>
    Bentility Team`;
}

const HTML = (data) => {
    return `
    <p>${data.message}</p>
    `;
}

const  Templates = {
    WelcomeTEXT,
    WelcomeHTML,
    HTML
}

export default Templates;
