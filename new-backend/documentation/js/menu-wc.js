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
                                            'data-bs-target="#controllers-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' : 'data-bs-target="#xs-controllers-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' :
                                            'id="xs-controllers-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' : 'data-bs-target="#xs-injectables-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' :
                                        'id="xs-injectables-links-module-AppModule-05e8f82a3e638f1b598e491d90d6b08021a668f34b55ef9103afefa8946daa98befa50abc0015f8ea6e2230f7d006b63ed051a8d5bb3150ac3a24b3925a64830"' }>
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
                                        'data-bs-target="#injectables-links-module-AuthModule-6c8d0a8b0045bccb28db150cd5e96e0fd54dd47d89720f2faed07611bdd47f062ac9adb8baea35367bc10c2d73cc04ebb61905bc090e1fcb06451b6fef7b8c71"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6c8d0a8b0045bccb28db150cd5e96e0fd54dd47d89720f2faed07611bdd47f062ac9adb8baea35367bc10c2d73cc04ebb61905bc090e1fcb06451b6fef7b8c71"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6c8d0a8b0045bccb28db150cd5e96e0fd54dd47d89720f2faed07611bdd47f062ac9adb8baea35367bc10c2d73cc04ebb61905bc090e1fcb06451b6fef7b8c71"' :
                                        'id="xs-injectables-links-module-AuthModule-6c8d0a8b0045bccb28db150cd5e96e0fd54dd47d89720f2faed07611bdd47f062ac9adb8baea35367bc10c2d73cc04ebb61905bc090e1fcb06451b6fef7b8c71"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
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
                                <a href="classes/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardLabel.html" data-type="entity-link" >CardLabel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardMember.html" data-type="entity-link" >CardMember</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardInput.html" data-type="entity-link" >CreateBoardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardPayload.html" data-type="entity-link" >CreateBoardPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCardInput.html" data-type="entity-link" >CreateCardInput</a>
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
                                <a href="classes/IMutation.html" data-type="entity-link" >IMutation</a>
                            </li>
                            <li class="link">
                                <a href="classes/IQuery.html" data-type="entity-link" >IQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/Label.html" data-type="entity-link" >Label</a>
                            </li>
                            <li class="link">
                                <a href="classes/List.html" data-type="entity-link" >List</a>
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
                                <a href="classes/UpdateBoardInput.html" data-type="entity-link" >UpdateBoardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCardInput.html" data-type="entity-link" >UpdateCardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLabelInput.html" data-type="entity-link" >UpdateLabelInput</a>
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