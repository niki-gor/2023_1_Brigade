import '@/index.css';
import { store } from '@store/store';
import { createAuthAction } from '@actions/authActions';

store.dispatch(createAuthAction());

// import '@/index.css';
// import { DumbContacts } from "@components/contacts/contacts"
// import { SmartContacts } from "@containers/contacts/contacts";
// import {DYNAMIC, ROOT} from "@config/config";
// import {DumbCreateGroup} from "@/components/createGroup/createGroup";
// import {dataInputUI} from "@components/ui/data-input/data-input";
// import {blueButtonUI} from "@components/ui/blue-button/blue-button";
// import {DumbContact} from "@components/contact/contact";
// import {smallEllipseIconUI} from "@components/ui/small-ellipse-icon/small-ellipse-icon";
// import {SmartCreateGroup} from "@/containers/createGroup/createGroup";
// import {store} from "@store/store";

// const crtGroup = new SmartCreateGroup({
//     contacts: {
//         ...
//             [
//                 {
//                     id: 1,
//                     avatar: "https://oir.mobi/uploads/posts/2021-04/1619691521_16-oir_mobi-p-bolshaya-obezyana-zhivotnie-krasivo-foto-17.jpg",
//                     email: "marcussss1@gmail.com",
//                     nickname: "marcussss1",
//                     status: "marcussss1",
//                     username: "marcussss1",
//                 },
//                 {
//                     id: 2,
//                     avatar: "https://oir.mobi/uploads/posts/2021-04/1619691521_16-oir_mobi-p-bolshaya-obezyana-zhivotnie-krasivo-foto-17.jpg",
//                     email: "marcussss2@gmail.com",
//                     nickname: "marcussss2",
//                     status: "marcussss2",
//                     username: "marcussss2"
//                 },
//                 {
//                     id: 3,
//                     avatar: "https://oir.mobi/uploads/posts/2021-04/1619691521_16-oir_mobi-p-bolshaya-obezyana-zhivotnie-krasivo-foto-17.jpg",
//                     email: "marcussss3@gmail.com",
//                     nickname: "marcussss3",
//                     status: "marcussss3",
//                     username: "marcussss3"
//                 },
//             ],
//     },
//     rootNode: DYNAMIC,
// });

// crtGroup.render();
