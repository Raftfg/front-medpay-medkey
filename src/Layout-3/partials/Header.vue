<template>
    <div>
        <header>
            <a href="#" class="logo">Logo</a>

            <nav>
                <a href="#">Acceuil</a>
                <a href="#">Acceuil</a>
                <a href="#">Acceuil</a>
                <a href="#">Acceuil</a>
            </nav>

            <a href="#">Se connecter</a>
        </header>
    </div>
</template>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding:20px 120px;
        background: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 100;
    }
</style>