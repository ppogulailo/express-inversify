// // function Component(id: number) {
// //     console.log('Init Com')
// //     return (target: Function) => {
// //         console.log('Run Com')
// //         target.prototype.id = id
// //     }
// // }
// //
// // function Logger() {
// //     console.log('Init Logger')
// //     return (target: Function) => {
// //         console.log('Run Logger')
// //     }
// // }
// //
// // function Method(
// //     target: Object,
// //     propertyKey: string,
// //     propertyDescriptor: PropertyDescriptor
// // ) {
// //     console.log(propertyKey)
// //     propertyDescriptor.value = function (...args: any[]) {
// //         return args[0] * 10
// //     }
// // }
// //
// // function Prop(
// //     target: Object,
// //     propertyKey: string,
// // ) {
// //     let value: number
// //     const getter = () => {
// //         console.log('Get!')
// //         return value
// //     }
// //     const setter = (newNum: number) => {
// //         console.log('Set!')
// //         value = newNum
// //     }
// //     Object.defineProperty(target, propertyKey, {
// //         get: getter,
// //         set: setter,
// //     })
// // }
// //
// // function Param(
// //     target: Object,
// //     propertyKey: string,
// //     index: number
// // ) {
// //     console.log(propertyKey, index)
// // }
// //
// // @Logger()
// // @Component(1)
// // export class Test {
// //     @Prop id: number;
// //
// //     @Method
// //     update(@Param newId: number) {
// //         this.id = newId;
// //         return this.id
// //     }
// // }
// //
// // console.log(new Test().id)
// // console.log(new Test().update(2))
// import 'reflect-metadata'
//
//
// function Injectable(key:string) {
//     return (target: Function) => {
//         Reflect.defineMetadata(key, 1, target);
//         const meta = Reflect.getMetadata(key, target)
//         console.log(meta)
//     }
// }
// function Inject(key:string) {
//     return (target: Function) => {
//         Reflect.defineMetadata(key, 1, target);
//         const meta = Reflect.getMetadata(key, target)
//         console.log(meta)
//     }
// }
// function Prop(target: Object, name: string) {
//
// }
//
// @Injectable('C')
// class C {
//     @Prop prop: number;
//
// }
// @Injectable('D')
// class D {
//    constructor(@Inject('C')c:C) {
//    }
//
// }
