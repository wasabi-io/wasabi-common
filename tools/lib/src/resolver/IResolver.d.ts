interface IResolver {
    apply(resolve: (path: string) => any): any;
}
export default IResolver;
