<template>
    <div class="menu-container">
         <div class="top-line">
             <div class="logo-title">
                 <NuxtLink to="/main-page" class="logo">
                     <h1>{{ config.sitename }}</h1>
                 </NuxtLink>
             </div>
         </div>
 
         <nav class="nav">
             <ul class="nav-items">
                 <NuxtLink to="/main-page" class="nav-item">Home</NuxtLink>
                 <NuxtLink to="/contact-us" class="nav-item">Contact</NuxtLink>                                             
             </ul>
         </nav>
    </div> 
 </template>
 
 <script setup lang="ts">
     const { public: config } = useRuntimeConfig()
 </script>
 
 <style scoped>
 header{ 
     background: white;
     position: sticky; 
     top: 0;
     width: 100%;
     padding-bottom: 1em;
     z-index: 999;
 }
 
 .logo-title {
     color: var(--clr-header-nav-text-primary);
     margin: var(--desktop-gutter);
 }
 
 .nav {
     left: 0;
     width: 100%;
     background-image: linear-gradient(
         to bottom right, 
         var(--clr-header-nav-background-start), 
         var(--clr-header-nav-backgrund-end)
     );
 }
 
 .nav-items {
     display: flex;
     flex-direction: row;
     justify-self: stretch;
     justify-content: center;
     margin: 0 var(--desktop-gutter);
     text-decoration: none;
     padding: 0;
 }
 
 .nav-item {
     background-color: transparent;
     color: var(--clr-header-nav-text-primary);
     padding: 0.5em var(--nav-item-horizontal-padding);
     text-align: center;
     opacity: 1;
 }
 
 .nav-item:hover {
     background-color: var(--clr-header-nav-item-selected);
     color: var(--clr-header-nav-text-primary-selected);
 }
 
 a.logo, a.nav-item, a.nav-item:visited, a.nav-item:link {
     text-decoration: none;
     color: inherit;
 }
 
 .nav-item.router-link-active {
     font-weight: bold;
 }
 
 </style>