import { prisma } from "../lib/prisma";
import { UserRole } from "../middleWares/auth";

async function seedAdmin() {
  try {
    console.log("********** Admin Seeding Started.......");
    const adminData = {
      name: "Admin saheba",
      email: "admin5@ex.com",
      role: UserRole.ADMIN,
      password: "admin123",
    };
    // check user exist on DB or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("user alredy exist in db!!");
    }

    const appUrl = process.env.APP_URL || "http://localhost:4000";
    const authUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";

    const signupAdmin = await fetch(`${authUrl}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Better Auth checks trusted origins for auth endpoints.
        Origin: appUrl,
      },
      body: JSON.stringify(adminData),
    });

    const responseText = await signupAdmin.text();
    if (!signupAdmin.ok) {
      throw new Error(
        `Seed signup failed: ${signupAdmin.status} ${signupAdmin.statusText} - ${responseText}`,
      );
    }

    if(signupAdmin.ok){
        await prisma.user.update({
            where: {
                email: adminData.email
            },
            data: {
                emailVerified: true
            }
        })

        console.log("email verification verified");
    }

    console.log("Admin seeded successfully:", responseText);
  } catch (error) {
    console.log(error);
  }
}

seedAdmin();
