import {test} from '../fixtures/testBase';

test('login basico', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await loginPage.expectLoginSuccess(/.*inventory.html/);
})

test('login invalido', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    await loginPage.esperarError('Username and password do not match any user in this service');    
})

test('login vacio', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('', '');

    await loginPage.esperarError('Username is required');
});

test('username vacio', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');

    await loginPage.esperarError('Username is required');
});

test('password vacio', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('standard_user', '');

    await loginPage.esperarError('Password is required');
}); 

test('login con usuario bloqueado', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.esperarError('Sorry, this user has been locked out.');
});     

test('err desaparece al intentar de nuevo', async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong');

    await loginPage.esperarError('Username and password do not match any user in this service');

    await loginPage.login('standard_user', 'secret_sauce');

    await loginPage.expectLoginSuccess(/.*inventory.html/);
});
