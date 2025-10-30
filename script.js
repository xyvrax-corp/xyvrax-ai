var botui = new BotUI('botui-app');

botui.message.add({
  content: 'Bonjour ! Je suis ton chatbot IA. Que veux-tu savoir ?'
}).then(function () {
  return botui.action.text({
    action: {
      placeholder: 'Pose ta question ici...'
    }
  });
}).then(function (res) {
  botui.message.add({
    content: 'Tu as dit : "' + res.value + '". Je réfléchis...'
  });

  // Simule une réponse IA (à remplacer par une vraie API plus tard)
  setTimeout(function () {
    botui.message.add({
      content: 'Voici une réponse simulée à ta question : "' + res.value + '" 😉'
    });
  }, 1000);
});
