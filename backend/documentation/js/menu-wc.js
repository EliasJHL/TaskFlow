'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">new-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' : 'data-bs-target="#xs-controllers-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' :
                                            'id="xs-controllers-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' : 'data-bs-target="#xs-injectables-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' :
                                        'id="xs-injectables-links-module-AppModule-fe9dc02422cf670fedf8caaf4db383a4c6d5c9ddc495c19f21f77c6f5cae4c373b3f1a9630ecf0c6acf86b3923e3ae69c18c8707dc958e533e8a6b4b0d3bb9c0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' :
                                            'id="xs-controllers-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' }>
                                            <li class="link">
                                                <a href="controllers/GithubAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' :
                                        'id="xs-injectables-links-module-AuthModule-5f90958f05d1a9dd766a777c4fe9d815180b82164df83508861d0a756d436d767b86bbb2efab956bdb6827c8dc3d345b99d3462af23c6f90ef09842cab95c1a2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WsAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WsAuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoardModule.html" data-type="entity-link" >BoardModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BoardModule-7ad74b192fc26cea0bec420da4e901e8a9008845d9493f8756947faad540996af846f876b5213a2d1d82cabed342e6fa30173351efb0c5abb7114688940df127"' : 'data-bs-target="#xs-injectables-links-module-BoardModule-7ad74b192fc26cea0bec420da4e901e8a9008845d9493f8756947faad540996af846f876b5213a2d1d82cabed342e6fa30173351efb0c5abb7114688940df127"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BoardModule-7ad74b192fc26cea0bec420da4e901e8a9008845d9493f8756947faad540996af846f876b5213a2d1d82cabed342e6fa30173351efb0c5abb7114688940df127"' :
                                        'id="xs-injectables-links-module-BoardModule-7ad74b192fc26cea0bec420da4e901e8a9008845d9493f8756947faad540996af846f876b5213a2d1d82cabed342e6fa30173351efb0c5abb7114688940df127"' }>
                                        <li class="link">
                                            <a href="injectables/BoardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardModule.html" data-type="entity-link" >CardModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CardModule-47f95a563e294ec54ec0c67ef07ea2a4dcd75e4af72bc0f04e6670e578edca795208ae56a7aef2f590468039d15860ac2742f1dfe4322bacbd893716fc93272a"' : 'data-bs-target="#xs-injectables-links-module-CardModule-47f95a563e294ec54ec0c67ef07ea2a4dcd75e4af72bc0f04e6670e578edca795208ae56a7aef2f590468039d15860ac2742f1dfe4322bacbd893716fc93272a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CardModule-47f95a563e294ec54ec0c67ef07ea2a4dcd75e4af72bc0f04e6670e578edca795208ae56a7aef2f590468039d15860ac2742f1dfe4322bacbd893716fc93272a"' :
                                        'id="xs-injectables-links-module-CardModule-47f95a563e294ec54ec0c67ef07ea2a4dcd75e4af72bc0f04e6670e578edca795208ae56a7aef2f590468039d15860ac2742f1dfe4322bacbd893716fc93272a"' }>
                                        <li class="link">
                                            <a href="injectables/CardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChecklistModule.html" data-type="entity-link" >ChecklistModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChecklistModule-412a3077f195b312d1566b977447f72482645c8399b880aefd786f13dd8690c24aab42112d78d18f7b7d92d0fef2ab5ad80d45edec333966e34f0466635df1cf"' : 'data-bs-target="#xs-injectables-links-module-ChecklistModule-412a3077f195b312d1566b977447f72482645c8399b880aefd786f13dd8690c24aab42112d78d18f7b7d92d0fef2ab5ad80d45edec333966e34f0466635df1cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChecklistModule-412a3077f195b312d1566b977447f72482645c8399b880aefd786f13dd8690c24aab42112d78d18f7b7d92d0fef2ab5ad80d45edec333966e34f0466635df1cf"' :
                                        'id="xs-injectables-links-module-ChecklistModule-412a3077f195b312d1566b977447f72482645c8399b880aefd786f13dd8690c24aab42112d78d18f7b7d92d0fef2ab5ad80d45edec333966e34f0466635df1cf"' }>
                                        <li class="link">
                                            <a href="injectables/ChecklistService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChecklistService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GitHubSyncModule.html" data-type="entity-link" >GitHubSyncModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GitHubSyncModule-4dcef42d321bce1640ffcb2c447e054e03786fb106e29745a9f90e0ec840bd61cc5069dce3e78a230c6457de2b57a8cbe147a51f751931bf4dbd377d07108d31"' : 'data-bs-target="#xs-injectables-links-module-GitHubSyncModule-4dcef42d321bce1640ffcb2c447e054e03786fb106e29745a9f90e0ec840bd61cc5069dce3e78a230c6457de2b57a8cbe147a51f751931bf4dbd377d07108d31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GitHubSyncModule-4dcef42d321bce1640ffcb2c447e054e03786fb106e29745a9f90e0ec840bd61cc5069dce3e78a230c6457de2b57a8cbe147a51f751931bf4dbd377d07108d31"' :
                                        'id="xs-injectables-links-module-GitHubSyncModule-4dcef42d321bce1640ffcb2c447e054e03786fb106e29745a9f90e0ec840bd61cc5069dce3e78a230c6457de2b57a8cbe147a51f751931bf4dbd377d07108d31"' }>
                                        <li class="link">
                                            <a href="injectables/GitHubSyncService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GitHubSyncService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabelModule.html" data-type="entity-link" >LabelModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LabelModule-ef85a8fde274e7b88a0ab894763a70ad32e2cff70ec0f9fcee7877276834954cb2cef2fc537abd0709cb336bb82a43eb6c6201d09a0ba1e8d09bd998e9f2f79d"' : 'data-bs-target="#xs-injectables-links-module-LabelModule-ef85a8fde274e7b88a0ab894763a70ad32e2cff70ec0f9fcee7877276834954cb2cef2fc537abd0709cb336bb82a43eb6c6201d09a0ba1e8d09bd998e9f2f79d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LabelModule-ef85a8fde274e7b88a0ab894763a70ad32e2cff70ec0f9fcee7877276834954cb2cef2fc537abd0709cb336bb82a43eb6c6201d09a0ba1e8d09bd998e9f2f79d"' :
                                        'id="xs-injectables-links-module-LabelModule-ef85a8fde274e7b88a0ab894763a70ad32e2cff70ec0f9fcee7877276834954cb2cef2fc537abd0709cb336bb82a43eb6c6201d09a0ba1e8d09bd998e9f2f79d"' }>
                                        <li class="link">
                                            <a href="injectables/LabelService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabelService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListModule.html" data-type="entity-link" >ListModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ListModule-e7fda89a70e24af859ba0f27829bf45c304b73601d442b71499f33a06d56a7d792b8119e0fe37d548201d9c826e45fd70ae0e0c41daa92e3b8eebc1ff41c661e"' : 'data-bs-target="#xs-injectables-links-module-ListModule-e7fda89a70e24af859ba0f27829bf45c304b73601d442b71499f33a06d56a7d792b8119e0fe37d548201d9c826e45fd70ae0e0c41daa92e3b8eebc1ff41c661e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ListModule-e7fda89a70e24af859ba0f27829bf45c304b73601d442b71499f33a06d56a7d792b8119e0fe37d548201d9c826e45fd70ae0e0c41daa92e3b8eebc1ff41c661e"' :
                                        'id="xs-injectables-links-module-ListModule-e7fda89a70e24af859ba0f27829bf45c304b73601d442b71499f33a06d56a7d792b8119e0fe37d548201d9c826e45fd70ae0e0c41daa92e3b8eebc1ff41c661e"' }>
                                        <li class="link">
                                            <a href="injectables/ListService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-47cb8e7a258949e2db5437ed1fc073f87a59da04d0f40a3ec4e83df626d5531cae1ecdf93d4296867f1c5e594848a9a194642dfebf31e6570f66628cb6a66b21"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-47cb8e7a258949e2db5437ed1fc073f87a59da04d0f40a3ec4e83df626d5531cae1ecdf93d4296867f1c5e594848a9a194642dfebf31e6570f66628cb6a66b21"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-47cb8e7a258949e2db5437ed1fc073f87a59da04d0f40a3ec4e83df626d5531cae1ecdf93d4296867f1c5e594848a9a194642dfebf31e6570f66628cb6a66b21"' :
                                        'id="xs-injectables-links-module-PrismaModule-47cb8e7a258949e2db5437ed1fc073f87a59da04d0f40a3ec4e83df626d5531cae1ecdf93d4296867f1c5e594848a9a194642dfebf31e6570f66628cb6a66b21"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkspaceModule.html" data-type="entity-link" >WorkspaceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WorkspaceModule-1d612fe1423d6c4954864dafd33802b3ab5e1e4b5e272a19455675dcd9bb5dcaec01e22c0de27f940d8d0ae0a227893d4c4e32b80e479c1b0294d5683d082e8c"' : 'data-bs-target="#xs-injectables-links-module-WorkspaceModule-1d612fe1423d6c4954864dafd33802b3ab5e1e4b5e272a19455675dcd9bb5dcaec01e22c0de27f940d8d0ae0a227893d4c4e32b80e479c1b0294d5683d082e8c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WorkspaceModule-1d612fe1423d6c4954864dafd33802b3ab5e1e4b5e272a19455675dcd9bb5dcaec01e22c0de27f940d8d0ae0a227893d4c4e32b80e479c1b0294d5683d082e8c"' :
                                        'id="xs-injectables-links-module-WorkspaceModule-1d612fe1423d6c4954864dafd33802b3ab5e1e4b5e272a19455675dcd9bb5dcaec01e22c0de27f940d8d0ae0a227893d4c4e32b80e479c1b0294d5683d082e8c"' }>
                                        <li class="link">
                                            <a href="injectables/WorkspaceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkspaceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WsAuthModule.html" data-type="entity-link" >WsAuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WsAuthModule-31898fa54a37559ca5c679fae84673dd109c38d4981d116c6b8c7a8b857545e446522ab3ba9e403f66a652d42fa5279db0295bc22dba16104a8ded8e582c5597"' : 'data-bs-target="#xs-injectables-links-module-WsAuthModule-31898fa54a37559ca5c679fae84673dd109c38d4981d116c6b8c7a8b857545e446522ab3ba9e403f66a652d42fa5279db0295bc22dba16104a8ded8e582c5597"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WsAuthModule-31898fa54a37559ca5c679fae84673dd109c38d4981d116c6b8c7a8b857545e446522ab3ba9e403f66a652d42fa5279db0295bc22dba16104a8ded8e582c5597"' :
                                        'id="xs-injectables-links-module-WsAuthModule-31898fa54a37559ca5c679fae84673dd109c38d4981d116c6b8c7a8b857545e446522ab3ba9e403f66a652d42fa5279db0295bc22dba16104a8ded8e582c5597"' }>
                                        <li class="link">
                                            <a href="injectables/WsAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WsAuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddWorkspaceMemberInput.html" data-type="entity-link" >AddWorkspaceMemberInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssigneeAddedToCardEvent.html" data-type="entity-link" >AssigneeAddedToCardEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssigneeRemovedFromCardEvent.html" data-type="entity-link" >AssigneeRemovedFromCardEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Attachment.html" data-type="entity-link" >Attachment</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthError.html" data-type="entity-link" >AuthError</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthResolver.html" data-type="entity-link" >AuthResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthResultResolver.html" data-type="entity-link" >AuthResultResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthSuccess.html" data-type="entity-link" >AuthSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/Board.html" data-type="entity-link" >Board</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardEventPayloadResolver.html" data-type="entity-link" >BoardEventPayloadResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardEventPayloadResolver-1.html" data-type="entity-link" >BoardEventPayloadResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardResolver.html" data-type="entity-link" >BoardResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardCreatedEvent.html" data-type="entity-link" >CardCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardDeletedEvent.html" data-type="entity-link" >CardDeletedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardMovedEvent.html" data-type="entity-link" >CardMovedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardResolver.html" data-type="entity-link" >CardResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Checklist.html" data-type="entity-link" >Checklist</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChecklistResolver.html" data-type="entity-link" >ChecklistResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectGitHubProjectInput.html" data-type="entity-link" >ConnectGitHubProjectInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardInput.html" data-type="entity-link" >CreateBoardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCardInput.html" data-type="entity-link" >CreateCardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateChecklistInput.html" data-type="entity-link" >CreateChecklistInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFieldMappingInput.html" data-type="entity-link" >CreateFieldMappingInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLabelInput.html" data-type="entity-link" >CreateLabelInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateListInput.html" data-type="entity-link" >CreateListInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserInput.html" data-type="entity-link" >CreateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWorkspaceInput.html" data-type="entity-link" >CreateWorkspaceInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponse.html" data-type="entity-link" >FileResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubAuthStatus.html" data-type="entity-link" >GitHubAuthStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubFieldMapping.html" data-type="entity-link" >GitHubFieldMapping</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubFieldOption.html" data-type="entity-link" >GitHubFieldOption</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubProject.html" data-type="entity-link" >GitHubProject</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubProjectField.html" data-type="entity-link" >GitHubProjectField</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubProjectItem.html" data-type="entity-link" >GitHubProjectItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubProjectSync.html" data-type="entity-link" >GitHubProjectSync</a>
                            </li>
                            <li class="link">
                                <a href="classes/GitHubSyncResolver.html" data-type="entity-link" >GitHubSyncResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/IMutation.html" data-type="entity-link" >IMutation</a>
                            </li>
                            <li class="link">
                                <a href="classes/IQuery.html" data-type="entity-link" >IQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISubscription.html" data-type="entity-link" >ISubscription</a>
                            </li>
                            <li class="link">
                                <a href="classes/Label.html" data-type="entity-link" >Label</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelAddedToCardEvent.html" data-type="entity-link" >LabelAddedToCardEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelCreatedEvent.html" data-type="entity-link" >LabelCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelDeletedEvent.html" data-type="entity-link" >LabelDeletedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelRemovedFromCardEvent.html" data-type="entity-link" >LabelRemovedFromCardEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelResolver.html" data-type="entity-link" >LabelResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/List.html" data-type="entity-link" >List</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListCreatedEvent.html" data-type="entity-link" >ListCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListDeletedEvent.html" data-type="entity-link" >ListDeletedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListMovedEvent.html" data-type="entity-link" >ListMovedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListResolver.html" data-type="entity-link" >ListResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginInput.html" data-type="entity-link" >LoginInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/PinWorkspacePayload.html" data-type="entity-link" >PinWorkspacePayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterInput.html" data-type="entity-link" >RegisterInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/Success.html" data-type="entity-link" >Success</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncResult.html" data-type="entity-link" >SyncResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBoardInput.html" data-type="entity-link" >UpdateBoardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCardInput.html" data-type="entity-link" >UpdateCardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFieldMappingInput.html" data-type="entity-link" >UpdateFieldMappingInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateGitHubSyncInput.html" data-type="entity-link" >UpdateGitHubSyncInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateListInput.html" data-type="entity-link" >UpdateListInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMemberRoleInput.html" data-type="entity-link" >UpdateMemberRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserInput.html" data-type="entity-link" >UpdateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateWorkspaceInput.html" data-type="entity-link" >UpdateWorkspaceInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/WhiteboardUpdatedEvent.html" data-type="entity-link" >WhiteboardUpdatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Workspace.html" data-type="entity-link" >Workspace</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkspaceMembers.html" data-type="entity-link" >WorkspaceMembers</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkspaceResolver.html" data-type="entity-link" >WorkspaceResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WorkspaceGuard.html" data-type="entity-link" >WorkspaceGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});