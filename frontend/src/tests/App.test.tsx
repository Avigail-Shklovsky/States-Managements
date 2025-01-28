// import { render, screen } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { expect, test } from 'vitest'
// import App from '../App'

// test('renders main page correctly', () => {
//   const queryClient = new QueryClient()

//   render(
//     <QueryClientProvider client={queryClient}>
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>
//     </QueryClientProvider>
//   )

//   // Use Vitest's built-in matchers
//   const element = screen.queryByText("hello")
//   expect(element).toBeTruthy() // Check if the element is truthy (i.e., exists)
// })


// import { render, screen } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { RecoilRoot } from 'recoil'
// import { expect, test } from 'vitest'
// import App from '../App'

// // test('renders StatesGridLayout on the root route', () => {
// //   const queryClient = new QueryClient()

// //   render(
// //     <QueryClientProvider client={queryClient}>
// //       <RecoilRoot>
// //         <MemoryRouter initialEntries={['/']}>
// //           <App />
// //         </MemoryRouter>
// //       </RecoilRoot>
// //     </QueryClientProvider>
// //   )

// //   // Test if StatesGridLayout is rendered when the route is '/'
// //   const statesGridLayoutElement = screen.queryByTestId('states-grid-layout') // Assuming StatesGridLayout has a data-testid="states-grid-layout"
// //   expect(statesGridLayoutElement).toBeTruthy() // Check if the element exists
// // })

// // test('renders StateForm on the /form/:id route', () => {
// //   const queryClient = new QueryClient()

// //   render(
// //     <QueryClientProvider client={queryClient}>
// //       <RecoilRoot>
// //         <MemoryRouter initialEntries={['/form/1']}>
// //           <App />
// //         </MemoryRouter>
// //       </RecoilRoot>
// //     </QueryClientProvider>
// //   )

// //   // Test if StateForm is rendered when the route is '/form/:id'
// //   const stateFormElement = screen.queryByTestId('state-form') // Assuming StateForm has a data-testid="state-form"
// //   expect(stateFormElement).toBeTruthy() // Check if the element exists
// // })
// test('renders StatesGridLayout on the root route', () => {
//     const queryClient = new QueryClient()
  
//     render(
//       <QueryClientProvider client={queryClient}>
//         <RecoilRoot>
//           <MemoryRouter initialEntries={['/']}>
//             <App />
//           </MemoryRouter>
//         </RecoilRoot>
//       </QueryClientProvider>
//     )
  
//     // Check for any visible content in StatesGridLayout
//     const element = screen.queryByText('new')
//     expect(element).toBeTruthy() // This can help verify the component rendered
//   })
  

// App.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import App from "../App";

describe("App Routing", () => {
//   test("renders StatesGridLayout on the root route", () => {
//     const queryClient = new QueryClient();

//     render(
//       <QueryClientProvider client={queryClient}>
//         <RecoilRoot>
//           <MemoryRouter initialEntries={["/"]}>
//             <App />
//           </MemoryRouter>
//         </RecoilRoot>
//       </QueryClientProvider>
//     );
//     screen.debug(); // Logs the DOM structure

//     const element = screen.getByTestId("states-grid-layout");
//     expect(element).toBeInTheDocument();
//   });

  test("renders StateForm on '/form' route", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <MemoryRouter initialEntries={["/form"]}>
            <App />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>
    );

    const element = screen.getByTestId("state-form"); 
    expect(element).toBeInTheDocument();
  });
});