import {getAuth} from '@clerk/express'
import { Request, Response, NextFunction } from 'express'

export default async function AuthMiddleware(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const auth = req.headers.authorization
    if (!auth) {
      res.status(401).json({ message: 'Authorization denied!' })
      return
    }

    const token = auth.split(' ')[1]
    const clerkUser = getAuth(req)

    if (!clerkUser) {
      res.status(403).json({ message: 'Forbidden!' })
      return
    }

    req.user = clerkUser

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Autenticação falhou' })
    return
  }
}
