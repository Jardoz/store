import React from 'react'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <footer className="bg-white border-t">
        <div className="mx-auto py-10">
            <p className="text-center text-xs text-black">
                &copy; 2023 Store LightTheme, Inc. All rights reserved
            </p>
        </div>
    </footer>
  )
}
