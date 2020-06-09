const requireLogin = require('../middlewares/requireLogin')
const sgMail = require('@sendgrid/mail')

const messageTemplate = (item, from, body) => {
  return `
    <html>
      <body>
        <h3>Ett meddelande angående <a href="https://projecteverything.herokuapp.com/item/${item._id}">${item.title}</h3>
        <h4>${from} skickade följande meddelande till dig:</h4>
        <p>${body}</p>
      </body>
    <html>
  `;
};

module.exports = (app) => {

  app.post('/api/message', requireLogin, async (req, res, next) => {
    const { to, from, body, item } = req.body

    const message = ({
      title: 'A message from everyThing',
      subject: 'A message from everyThing',
      html: messageTemplate(item, from.name, body),
      to: to.email,
      from: from.email,
    })

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
      await sgMail.send(message);
      res.send();
    } catch (err) {
      next(err)
    }

  })

}
