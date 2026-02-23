import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

interface JwtPayload {
  id: number;
  name: string;
  email: string;
}

// Verify token dan return decoded payload, atau null kalau invalid
export const verifyToken = async (req: NextRequest): Promise<JwtPayload | null> => {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) return null;

    return decoded;
  } catch {
    return null;
  }
};

// Wrapper untuk protected route handler
type RouteHandler = (req: NextRequest, context: { params: Record<string, string> }) => Promise<NextResponse>;

export const withAuth = (handler: RouteHandler): RouteHandler => {
  return async (req, context) => {
    const user = await verifyToken(req);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, context);
  };
};

// Helper generate tokens
export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.PRIVATE_KEY!, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.REFRESH_KEY!, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};
