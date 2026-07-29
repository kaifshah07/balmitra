// const stats = [
//   {
//     number: "25K+",
//     label: "Products",
//   },
//   {
//     number: "350+",
//     label: "Verified Vendors",
//   },
//   {
//     number: "50K+",
//     label: "Happy Customers",
//   },
// ];

// export default function HeroStats() {
//   return (
//     <div className="mt-7 grid grid-cols-3 gap-4  max-w-lg">
//       {stats.map((item) => (
//         <div key={item.label}>
//           <h3 className="text-3xl font-bold text-[#0B1220]">
//             {item.number}
//           </h3>

//           <p className="mt-1 text-sm text-gray-500">
//             {item.label}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// // }a

const stats = [
  {
    number: "25K+",
    label: "Products",
  },
  {
    number: "350+",
    label: "Vendors",
  },
  {
    number: "50K+",
    label: "Customers",
  },
];


export default function HeroStats(){

return(

<div className="flex gap-8">


{
stats.map((item)=>(

<div key={item.label}>

<h3 className="text-xl font-bold text-[#0B1220]">
{item.number}
</h3>


<p className="mt-1 text-xs text-gray-500">
{item.label}
</p>


</div>

))
}


</div>

)

}