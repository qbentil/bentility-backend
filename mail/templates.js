const WelcomeTEXT = (user) => {
    const { name, username, password, role } = user;
    return `
    Hello  ${name} - [${username}]!

    Welcome to the team!
    You are now a member of the team as a/an ${role}
    This is where you can share your tech ideas for fellow developers.
    
    Your password is: ${password}
        
    
    NB! Make sure to change your password after your first login.
    
    Regards,
    Bentility Team`;
}
const WelcomeHTML = (user) => {
    const { name, username, password, role } = user;
    return `
    Hello  <i>${name} - [${username}]</i>! <br/>

    Welcome to the team! <br/>
    You are now a member of the team as a/an ${role}. <br/>
    This is where you can share your tech ideas for fellow developers. <br/> <br/>
    
    Your password is: <b>${password}</b>   <br/> <br/>
        
    
    <b>NB!</b> Make sure to change your password after your first login.   <br/> <br/>
    
    Regards,<br/>
    Bentility Team`;
}

const HTML = (data) => {
    return `
    <h1>${data.subject}</h1>
    <p>${data.message}</p>
    `;
}

const  Templates = {
    WelcomeTEXT,
    WelcomeHTML,
    HTML
}

export default Templates;