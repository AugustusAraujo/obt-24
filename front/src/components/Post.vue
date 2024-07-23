<style>
.Post {
    position: relative;
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user {
    position: absolute; 
    top: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.textUser {
    position: absolute;
    left: 80px;
    top: 20px;
    text-align: justify;
}

.textUser h1 {
    margin: 0;
    font-size: 18px;
}

.textUser h5 {
    margin: 2px 0;
    font-size: 14px;
    color: #555;
}

.exclamation {
    position: absolute; 
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
}

.postContent {
    text-align: justify;
    margin-top: 80px;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
}

.postImage {
    width:30%;
    margin: 20px 0;
    border-radius: 10px;
}

.likeSection {
    display: flex;
}

.like {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    margin-top: 11px;
}
</style>
<template>
    <div class="Post">
        <img class="user" src="../../assets/user.png" alt="User Icon"/>
        <div class="textUser">
            <h1>André da Silva</h1>
            <h5>Salvador - BA</h5>
            <h5>Há 6 dias</h5>
        </div>
        <img class="exclamation" src="../../assets/exclamation.png" alt="Exclamation Icon"/>
        <p class="postContent">
            Eu moro em um bairro mais afastado do resto da cidade, separado por um rio. A conexão mais fácil era através de uma ponte. 
            Só que há três anos atrás teve um temporal terrível que acabou em enchente e, como a ponte estava sem a manutenção adequada, 
            ela acabou caindo. Agora, para termos acesso ao centro da cidade, temos que dar uma volta de 10km a mais, o que dificulta 
            a vida de todos os moradores dessa região.
            Até agora, a ponte continua exatamente do mesmo jeito e ninguém fez nada! Precisamos que algo seja feito, não dá para 
            continuar desse jeito.
        </p>
        <img class="postImage" src="../../assets/midia.png" alt="Post Image"/>
        <div class="likeSection">
            <img class="like" src="../../assets/like.png" alt="Like Icon"/>
            <p>Você e mais 11.547 pessoas impulsionaram.</p>
        </div>
    </div>
  </template>