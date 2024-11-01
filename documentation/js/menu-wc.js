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
                    <a href="index.html" data-type="index-link">ticket-hive-be documentation</a>
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
                                <span class="icon ion-ios-paper"></span>README
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
                                            'data-bs-target="#controllers-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' :
                                            'id="xs-controllers-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' :
                                        'id="xs-injectables-links-module-AppModule-b9d6a5d4a3f3ef1819a5fa1f92efd6cb95ee4c5729f4d0ded004db1176d1384a869b5ea61f348d893aafc997199e24e08e9bf6296890c1db5006630fe4951061"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' :
                                            'id="xs-controllers-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' :
                                        'id="xs-injectables-links-module-AuthModule-1863e5efb49792e7a1e43b9dfefc83b44e6d25fb18684fe23b48288ea76d09a7aceb6d24765636b6ab13766688a41620b0354f4ed274b139e19b2ef2bbe1e04b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ForgotPasswordProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResetPasswordProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' : 'data-bs-target="#xs-controllers-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' :
                                            'id="xs-controllers-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' }>
                                            <li class="link">
                                                <a href="controllers/EventsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' : 'data-bs-target="#xs-injectables-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' :
                                        'id="xs-injectables-links-module-EventsModule-1ddfe7272a9ed72ee32417fc76e00ccbcb6a2af2a1b7d48e5e580ffaefcbfc329f6e3e5b107dec4ac01f640c61d720e8bcaaddce0f2aeafcb3d2966b1aac4135"' }>
                                        <li class="link">
                                            <a href="injectables/CreateEventProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateEventProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetUserEventsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetUserEventsProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-f7bcfee3e019a43868c77156759506d8c24edd9f6bea1978db0eb6674aaacc72ea4d041b6e819592fc410c460835f2c5ab91572ad6a29306d3db4d07bf15b9e6"' : 'data-bs-target="#xs-injectables-links-module-MailModule-f7bcfee3e019a43868c77156759506d8c24edd9f6bea1978db0eb6674aaacc72ea4d041b6e819592fc410c460835f2c5ab91572ad6a29306d3db4d07bf15b9e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-f7bcfee3e019a43868c77156759506d8c24edd9f6bea1978db0eb6674aaacc72ea4d041b6e819592fc410c460835f2c5ab91572ad6a29306d3db4d07bf15b9e6"' :
                                        'id="xs-injectables-links-module-MailModule-f7bcfee3e019a43868c77156759506d8c24edd9f6bea1978db0eb6674aaacc72ea4d041b6e819592fc410c460835f2c5ab91572ad6a29306d3db4d07bf15b9e6"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' :
                                        'id="xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentsModule.html" data-type="entity-link" >PaymentsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentsModule-1c9818a54acddac88c6b04e2c27825a38818a92a70766d2b6b0f4f57ebe62c53956e0d54a70752f268f44c8106668e2af85cc19d114147d7754070c25a49262a"' : 'data-bs-target="#xs-injectables-links-module-PaymentsModule-1c9818a54acddac88c6b04e2c27825a38818a92a70766d2b6b0f4f57ebe62c53956e0d54a70752f268f44c8106668e2af85cc19d114147d7754070c25a49262a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentsModule-1c9818a54acddac88c6b04e2c27825a38818a92a70766d2b6b0f4f57ebe62c53956e0d54a70752f268f44c8106668e2af85cc19d114147d7754070c25a49262a"' :
                                        'id="xs-injectables-links-module-PaymentsModule-1c9818a54acddac88c6b04e2c27825a38818a92a70766d2b6b0f4f57ebe62c53956e0d54a70752f268f44c8106668e2af85cc19d114147d7754070c25a49262a"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaystackModule.html" data-type="entity-link" >PaystackModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' : 'data-bs-target="#xs-controllers-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' :
                                            'id="xs-controllers-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' }>
                                            <li class="link">
                                                <a href="controllers/PaystackController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaystackController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' : 'data-bs-target="#xs-injectables-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' :
                                        'id="xs-injectables-links-module-PaystackModule-f6ced817980fa455ea0a301cf500a2d6fcd354e447bed4ca0dc7a42a558875f7d0360c1fe12f111b4fdc291bb82648326dd954531ed94e259e18625a7ea6d084"' }>
                                        <li class="link">
                                            <a href="injectables/PaystackService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaystackService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' :
                                            'id="xs-controllers-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' :
                                        'id="xs-injectables-links-module-SubscribersModule-b8305fbba9c7d0e1a65f5a2ffacd8a4cf104461d3a1e708d4d25b5833a623db19f1b293583f71dd93a3094bf1852545bd8b410766eb4ce5a17c42fd1bfd49774"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketsModule.html" data-type="entity-link" >TicketsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' : 'data-bs-target="#xs-controllers-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' :
                                            'id="xs-controllers-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' }>
                                            <li class="link">
                                                <a href="controllers/TicketsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' : 'data-bs-target="#xs-injectables-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' :
                                        'id="xs-injectables-links-module-TicketsModule-0ce508aef2e71682e36cda369c14831aa4e238cb513895fd75132e939cc38e680247b92c87d3b27c42cf644bbfe7d35f169e5a78edf745223b35a3949f8a4cf3"' }>
                                        <li class="link">
                                            <a href="injectables/BuyTicketProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuyTicketProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTicketPdfProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTicketPdfProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateBoughtTicketProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateBoughtTicketProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' :
                                        'id="xs-injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' }>
                                        <li class="link">
                                            <a href="injectables/UploadToAwsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadToAwsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' :
                                            'id="xs-controllers-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' :
                                        'id="xs-injectables-links-module-UsersModule-694aa7ede49ebfcd3441975a369e546dccbc1dacde1d0909b1c4e628c30b6d058e85a509944b97c75a9f3971772e6b1fc1c96a6f750e6b44d37b2f5bf53eb667"' }>
                                        <li class="link">
                                            <a href="injectables/ChangeUserPasswordProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangeUserPasswordProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreaterUsersProviders.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreaterUsersProviders</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindUserByResetOtpAndExpiryTimeProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindUserByResetOtpAndExpiryTimeProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StoreOtpAndExpireProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreOtpAndExpireProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Event.html" data-type="entity-link" >Event</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Payment.html" data-type="entity-link" >Payment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Subscriber.html" data-type="entity-link" >Subscriber</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Ticket.html" data-type="entity-link" >Ticket</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyTicketsDto.html" data-type="entity-link" >CreateManyTicketsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link" >CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPassswordDto.html" data-type="entity-link" >ForgotPassswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEventsBaseDto.html" data-type="entity-link" >GetEventsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEventsDto.html" data-type="entity-link" >GetEventsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersBaseDto.html" data-type="entity-link" >GetUsersBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersDto.html" data-type="entity-link" >GetUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchTicketDto.html" data-type="entity-link" >PatchTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentDto.html" data-type="entity-link" >PaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketTypeDto.html" data-type="entity-link" >TicketTypeDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
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
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
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
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
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
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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